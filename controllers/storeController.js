import User from '../models/user.js';
import Product from '../models/producto.js';

const storeController = {

  // --- OBTENER LA INFORMACIÓN PÚBLICA DE UNA TIENDA Y SUS PRODUCTOS ---
  getStoreBySlug: async (req, res) => {
    try {
      const { storeSlug } = req.params;

      // 1. Buscamos la tienda por su slug único.
      // Usamos .select('-password') para asegurarnos de nunca enviar el hash de la contraseña.
      const store = await User.findOne({ storeSlug }).select('-password');
      
      if (!store) {
        return res.status(404).json({ message: 'Tienda no encontrada.' });
      }

      // 2. Si encontramos la tienda, buscamos todos los productos que le pertenecen.
      const products = await Product.find({ userId: store._id }).sort({ createdAt: -1 });

      // 3. Devolvemos un objeto con la información de la tienda y su lista de productos.
      res.json({
        store: {
          id: store._id,
          storeName: store.storeName,
          storeSlug: store.storeSlug,
        },
        products
      });

    } catch (error) {
      console.error('Error al obtener la tienda pública:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export default storeController;
