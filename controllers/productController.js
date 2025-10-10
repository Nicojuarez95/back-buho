import Product from '../models/producto.js';

const productController = {

  // --- CREAR UN NUEVO PRODUCTO ---
  createProduct: async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;
      const userId = req.user.id; // Obtenemos el ID del usuario logueado desde el token

      if (!name || !price) {
        return res.status(400).json({ message: 'El nombre y el precio son obligatorios.' });
      }

      const newProduct = new Product({
        name,
        description,
        price,
        imageUrl,
        userId // Asociamos el producto al usuario
      });

      await newProduct.save();
      res.status(201).json({ message: 'Producto creado exitosamente.', product: newProduct });

    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  // --- OBTENER TODOS LOS PRODUCTOS DE LA TIENDA LOGUEADA ---
  getProductsByUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const products = await Product.find({ userId: userId });
      
      res.json(products);

    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  // --- ACTUALIZAR UN PRODUCTO ---
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params; // ID del producto a actualizar
      const userId = req.user.id;
      const { name, description, price, imageUrl } = req.body;

      // Buscamos el producto y nos aseguramos de que le pertenezca al usuario logueado
      const product = await Product.findOne({ _id: id, userId: userId });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para editarlo.' });
      }

      // Actualizamos los campos
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.imageUrl = imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json({ message: 'Producto actualizado exitosamente.', product: updatedProduct });

    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },
  
  // --- ELIMINAR UN PRODUCTO ---
  deleteProduct: async (req, res) => {
    try {
        const { id } = req.params; // ID del producto a eliminar
        const userId = req.user.id;

        const result = await Product.deleteOne({ _id: id, userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para eliminarlo.' });
        }

        res.json({ message: 'Producto eliminado exitosamente.' });

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export default productController;
