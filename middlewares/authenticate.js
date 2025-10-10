import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Buscamos el token en el header 'Authorization'
  const authHeader = req.headers['authorization'];
  // El formato es "Bearer TOKEN", por eso hacemos split y tomamos el segundo elemento
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // Si no hay token, devolvemos un error 401 (No autorizado)
    return res.status(401).json({ message: 'No se ha proporcionado un token.' });
  }

  // Verificamos la validez del token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token no es válido (expirado, malformado), devolvemos un error 403 (Prohibido)
      console.log('Error al verificar el token:', err.message);
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    
    // Si el token es válido, guardamos los datos del usuario en el objeto 'req'
    // para que los siguientes middlewares o controladores puedan usarlo.
    req.user = user;
    next(); // Continuamos con la siguiente función en la cadena de middlewares
  });
};

export default authenticateToken;
