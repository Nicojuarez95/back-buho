import jwt from 'jsonwebtoken';

const authorize = (roles = []) => {
    // Si se pasa un solo rol como string, lo convertimos a un array para simplificar
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(403).json({ message: 'Error de permisos. Rol no especificado.' });
        }

        // Verificamos si el rol del usuario está en la lista de roles permitidos.
        // Si la lista de roles está vacía, significa que cualquier usuario autenticado puede pasar.
        if (roles.length && !roles.includes(req.user.rol)) {
            // El usuario está logueado, pero no tiene permiso para esta acción.
            return res.status(403).json({ message: 'Acceso prohibido. Permisos insuficientes.' });
        }

        // El usuario tiene el rol adecuado, ¡continuamos!
        next();
    };
};

export default authorize;