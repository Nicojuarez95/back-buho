import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Función para crear un "slug" a partir del nombre de la tienda
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '') // Remueve caracteres inválidos
    .replace(/\-\-+/g, '-'); // Reemplaza múltiples - con uno solo
};

const authController = {
  // --- REGISTRO DE UNA NUEVA TIENDA ---
  register: async (req, res) => {
    try {
      const { storeName, email, password } = req.body;

      // 1. Validar que los datos necesarios están presentes
      if (!storeName || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }

      // 2. Verificar si el email ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está en uso.' });
      }

      // 3. Crear el slug y verificar si ya existe
      const storeSlug = createSlug(storeName);
      const existingSlug = await User.findOne({ storeSlug });
      if (existingSlug) {
        return res.status(400).json({ message: 'El nombre de la tienda ya existe, por favor elige otro.' });
      }

      // 4. Crear el nuevo usuario (la contraseña se hashea automáticamente por el middleware del modelo)
      const newUser = new User({
        storeName,
        storeSlug,
        email,
        password
      });

      await newUser.save();

      res.status(201).json({ message: 'Tienda registrada exitosamente.' });

    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error al registrar la tienda.' });
    }
  },

  // --- INICIO DE SESIÓN ---
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Buscar al usuario por su email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
      }

      // 2. Comparar la contraseña proporcionada con la hasheada en la BD
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }

      // 3. Si las credenciales son correctas, crear el payload para el token
      const payload = {
        id: user._id,
        rol: user.rol,
        storeName: user.storeName
      };

      // 4. Firmar el token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '8h' // El token expirará en 8 horas
      });

      res.json({
        message: 'Inicio de sesión exitoso.',
        token,
        user: payload
      });

    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
  }
};

export default authController;
