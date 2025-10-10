import bcrypt from 'bcrypt';
import 'dotenv/config';

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Contraseña original: ${password}`);
  console.log(`Contraseña encriptada: ${hashedPassword}`);
};

hashPassword('asdasd'); // Puedes cambiar esta contraseña por la que quieras
