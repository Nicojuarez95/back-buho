import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  // Guardamos el cashback total aquí para un acceso rápido y eficiente.
  // Se actualizará con cada compra o canje.
  totalCashback: {
    type: Number,
    default: 0
  },
  // --- CLAVE PARA MULTI-TENANT ---
  // Cada cliente pertenece a una tienda específica.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
