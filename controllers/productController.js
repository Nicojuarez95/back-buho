import Product from '../models/producto.js'; // Asegúrate que el nombre del archivo del modelo coincida

/**
 * Crea un nuevo producto, manejando la subida de una imagen.
 */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Construimos la URL de la imagen si se subió un archivo
    let imageUrl = null;
    if (req.file) {
      // req.file.path es la ruta local (ej: 'uploads/image-163...jpg') que Multer nos da.
      // La URL completa será accesible desde el frontend.
      // NOTA: Asegúrate que tu backend esté sirviendo la carpeta 'uploads' estáticamente.
      const imagePath = req.file.path.replace(/\\/g, "/"); // Normalizamos la ruta para cualquier sistema operativo
      imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl, // Guardamos la URL completa en la BD
      userId: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

/**
 * Obtiene todos los productos del usuario logueado.
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
};

/**
 * Obtiene un producto específico por su ID.
 */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, userId: req.user.id });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
};

/**
 * Actualiza un producto existente, manejando una posible nueva imagen.
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    const updateData = { name, description, price };

    // Si se sube una nueva imagen, actualizamos la URL
    if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/");
      updateData.imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;
      // Aquí podrías añadir lógica para borrar la imagen antigua del servidor si lo deseas
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true } // Esto hace que devuelva el documento ya actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


/**
 * Elimina un producto.
 */
export const deleteProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id, userId: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};

