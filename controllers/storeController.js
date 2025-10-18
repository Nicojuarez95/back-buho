import User from '../models/user.js';
import Product from '../models/producto.js'; // Asegúrate que el nombre de tu modelo de producto sea correcto

const storeController = {
  getStoreBySlug: async (req, res) => {
    try {
      const { storeSlug } = req.params;

      // Buscamos la tienda por su slug
      const store = await User.findOne({ storeSlug }).select('-password');
      
      if (!store) {
        return res.status(404).json({ message: 'Tienda no encontrada.' });
      }

      // Buscamos los productos que le pertenecen
      const products = await Product.find({ userId: store._id }).sort({ createdAt: -1 });

      // Devolvemos la información pública, incluyendo el número de teléfono
      res.json({
        storeName: store.storeName,
        phoneNumber: store.phoneNumber, // <-- ¡AQUÍ ESTÁ EL CAMBIO!
        products
      });

    } catch (error) {
      console.error('Error al obtener la tienda pública:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export default storeController;

