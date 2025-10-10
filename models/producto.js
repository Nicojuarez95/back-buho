import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false, // La descripción puede ser opcional
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: false // La imagen puede ser opcional al principio
  },
  // --- CLAVE PARA MULTI-TENANT ---
  // Cada producto pertenece a un usuario (tienda).
  // 'ref' le dice a Mongoose a qué modelo se refiere este ID.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
