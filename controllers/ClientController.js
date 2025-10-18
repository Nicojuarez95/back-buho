import Client from '../models/Client.js';
import Purchase from '../models/compra-transaccion.js'; 

const clientController = {

  // --- CREAR UN NUEVO CLIENTE ---
  createClient: async (req, res) => {
    try {
      const { name, phone } = req.body; // Quitamos 'email'
      const userId = req.user.id; // ID de la tienda logueada

      if (!name) {
        return res.status(400).json({ message: 'El nombre del cliente es obligatorio.' });
      }

      // Opcional: Verificar si ya existe un cliente con el mismo teléfono para esta tienda
      if (phone) {
          const existingClient = await Client.findOne({ phone, userId });
          if (existingClient) {
            return res.status(409).json({ message: 'Ya existe un cliente con ese teléfono.' });
          }
      }

      const newClient = new Client({
        name,
        phone,
        userId // Asociamos el cliente a la tienda
      });

      await newClient.save();
      res.status(201).json({ message: 'Cliente creado exitosamente.', client: newClient });

    } catch (error) {
      console.error('Error al crear el cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  // --- OBTENER TODOS LOS CLIENTES DE LA TIENDA LOGUEADA ---
  getClientsByUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const clients = await Client.find({ userId: userId });
      
      res.json(clients);

    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  // --- OBTENER UN CLIENTE ESPECÍFICO POR SU ID ---
  getClientById: async (req, res) => {
    try {
    const { id } = req.params;

    // Buscamos al cliente
    const client = await Client.findOne({ _id: id, userId: req.user.id });

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    // Buscamos todas las compras asociadas a ese cliente
    const purchases = await Purchase.find({ clientId: id, userId: req.user.id }).sort({ createdAt: -1 });

    // Enviamos un objeto que contiene tanto los datos del cliente como su historial
    res.status(200).json({
      client,
      purchases
    });

  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
  },

  // --- ACTUALIZAR UN CLIENTE ---
  updateClient: async (req, res) => {
    try {
      const { id } = req.params; // ID del cliente
      const userId = req.user.id;
      const { name, phone } = req.body; // Quitamos 'email'

      const updatedClient = await Client.findOneAndUpdate(
        { _id: id, userId: userId }, // Condición de búsqueda segura
        { name, phone },
        { new: true } // Opción para que devuelva el documento actualizado
      );

      if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente no encontrado o no tienes permiso para editarlo.' });
      }

      res.json({ message: 'Cliente actualizado exitosamente.', client: updatedClient });

    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },
  
  // --- ELIMINAR UN CLIENTE ---
  deleteClient: async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await Client.deleteOne({ _id: id, userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado o no tienes permiso para eliminarlo.' });
        }

        res.json({ message: 'Cliente eliminado exitosamente.' });

    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export default clientController;
