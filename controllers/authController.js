import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Registra una nueva tienda (usuario).
 */
const register = async (req, res) => {
    try {
        const { storeName, email, password } = req.body;

        if (!storeName || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }
        
        // Creamos el 'slug' a partir del nombre de la tienda
        const storeSlug = storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const existingSlug = await User.findOne({ storeSlug });
        if (existingSlug) {
             return res.status(400).json({ message: 'El nombre de la tienda ya está en uso, por favor elige otro.' });
        }

        const newUser = new User({
            storeName,
            email,
            password, // El hash se hace automáticamente gracias al pre-save hook en el modelo
            storeSlug
        });

        await newUser.save();
        res.status(201).json({ message: 'Tienda registrada exitosamente.' });

    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Inicia sesión y devuelve un token JWT y los datos del usuario.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Creamos el payload del token
        const payload = {
            id: user._id,
            storeName: user.storeName,
            storeSlug: user.storeSlug
        };

        // Firmamos el token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

        // --- LA CORRECCIÓN CLAVE ---
        // Devolvemos tanto el token como un objeto 'user' con la información necesaria.
        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user._id,
                storeName: user.storeName,
                storeSlug: user.storeSlug
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Envolvemos las funciones en un objeto y lo exportamos por defecto
const authController = {
    register,
    login
};

export default authController;

