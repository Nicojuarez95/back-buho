import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  // Monto total de la compra o del canje.
  amount: {
    type: Number,
    required: true
  },
  // El cashback generado en esta compra específica.
  // Si es un canje, este valor puede ser 0 o negativo si lo prefieres.
  cashbackGenerated: {
    type: Number,
    required: true,
    default: 0
  },
  // Para distinguir si fue una 'compra' o un 'cashback'.
  type: {
    type: String,
    enum: ['compra', 'cashback'], // Solo puede tener estos dos valores
    required: true
  },
  // --- RELACIONES ---
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Purchase = mongoose.model('Compra', purchaseSchema);

export default Purchase;
