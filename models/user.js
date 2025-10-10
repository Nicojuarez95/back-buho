import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// El modelo User ahora representa a cada tienda/emprendimiento.
const userSchema = new mongoose.Schema({
  storeName: { 
    type: String, 
    required: true,
    trim: true // Limpia espacios en blanco al inicio y final
  },
  // El "slug" es la parte de la URL amigable para el usuario (ej: /mi-tienda-genial)
  storeSlug: {
    type: String,
    required: true,
    unique: true, // No puede haber dos tiendas con el mismo slug
    lowercase: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  // El rol podría servir a futuro si quieres tener "empleados" dentro de una tienda.
  // Por ahora, lo mantenemos simple.
  rol: { 
    type: String, 
    default: 'Empleado' 
  }
}, {
  timestamps: true
});

// Middleware para hashear la contraseña ANTES de guardarla en la BD
userSchema.pre('save', async function(next) {
  // Si la contraseña no se ha modificado, no hacemos nada.
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
