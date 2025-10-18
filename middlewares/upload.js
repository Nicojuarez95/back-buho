import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  // Dónde se guardarán los archivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que la carpeta 'uploads' exista en la raíz del backend
  },
  // Cómo se nombrarán los archivos
  filename: function (req, file, cb) {
    // Creamos un nombre único para evitar sobreescribir archivos: campo-fecha.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif)'));
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB por archivo
});

// Exportamos un middleware para un solo archivo llamado 'image'
export default upload.single('image');
