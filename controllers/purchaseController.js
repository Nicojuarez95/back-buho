import Purchase from '../models/compra-transaccion.js';
import Client from '../models/Client.js';
import mongoose from 'mongoose';

const purchaseController = {

  // --- REGISTRAR UNA NUEVA COMPRA Y GENERAR CASHBACK ---
  addPurchase: async (req, res) => {
    const session = await mongoose.startSession(); // Inicia una sesión para la transacción
    session.startTransaction();

    try {
      const { clientId } = req.params;
      const { amount } = req.body;
      const userId = req.user.id;

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'El monto de la compra debe ser un número positivo.' });
      }

      // 1. Buscamos al cliente y nos aseguramos que pertenece a la tienda
      const client = await Client.findOne({ _id: clientId, userId }).session(session);
      if (!client) {
        throw new Error('Cliente no encontrado.');
      }

      // 2. Calculamos el cashback (10%)
      const cashbackGenerated = amount * 0.10;

      // 3. Creamos el registro de la compra
      const newPurchase = new Purchase({
        amount,
        cashbackGenerated,
        type: 'compra',
        clientId,
        userId
      });
      await newPurchase.save({ session });

      // 4. Actualizamos el cashback total del cliente
      client.totalCashback += cashbackGenerated;
      await client.save({ session });
      
      // Si todo fue bien, confirmamos la transacción
      await session.commitTransaction();
      res.status(201).json({ 
        message: 'Compra registrada y cashback generado exitosamente.', 
        purchase: newPurchase,
        client_new_cashback: client.totalCashback
      });

    } catch (error) {
      // Si algo falla, revertimos todos los cambios
      await session.abortTransaction();
      console.error('Error al agregar la compra:', error);
      res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    } finally {
      session.endSession();
    }
  },

  // --- CANJEAR CASHBACK ACUMULADO ---
  redeemCashback: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { clientId } = req.params;
        const { amount } = req.body; // Monto que el cliente desea canjear
        const userId = req.user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'El monto a canjear debe ser un número positivo.' });
        }

        // 1. Buscamos al cliente
        const client = await Client.findOne({ _id: clientId, userId }).session(session);
        if (!client) {
            throw new Error('Cliente no encontrado.');
        }

        // 2. Verificamos que tenga suficiente cashback
        if (client.totalCashback < amount) {
            throw new Error('El cliente no tiene suficiente cashback para canjear este monto.');
        }

        // 3. Creamos el registro del canje (tipo 'cashback')
        const redemption = new Purchase({
            amount, // El valor del "producto" que se lleva
            cashbackGenerated: 0, // Un canje no genera nuevo cashback
            type: 'cashback',
            clientId,
            userId
        });
        await redemption.save({ session });

        // 4. Descontamos el monto canjeado del total del cliente
        client.totalCashback -= amount;
        await client.save({ session });
        
        await session.commitTransaction();
        res.json({ 
            message: 'Cashback canjeado exitosamente.',
            redemption,
            client_new_cashback: client.totalCashback
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Error al canjear cashback:', error);
        res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    } finally {
        session.endSession();
    }
  },

  // --- OBTENER HISTORIAL DE COMPRAS DE UN CLIENTE ---
  getPurchaseHistoryByClient: async (req, res) => {
    try {
        const { clientId } = req.params;
        const userId = req.user.id;

        // Validamos que el cliente exista y pertenezca al usuario
        const clientExists = await Client.exists({ _id: clientId, userId });
        if (!clientExists) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const history = await Purchase.find({ clientId, userId }).sort({ createdAt: -1 }); // Ordenamos por fecha
        res.json(history);

    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export default purchaseController;
