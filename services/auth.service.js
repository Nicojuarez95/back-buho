import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

class AuthService {

    async register(data) {

        const exists = await User.findOne({
            email: data.email
        });

        if (exists) {
            throw new Error("Ya existe un usuario con ese email.");
        }

        const password = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            businessName: data.businessName,
            ownerName: data.ownerName,
            email: data.email,
            password
        });

        // Nunca devolvemos el password
        const userResponse = await User.findById(user._id).select("-password");

        return userResponse;
    }

    async login(email, password) {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Credenciales incorrectas.");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error("Credenciales incorrectas.");
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const userResponse = await User.findById(user._id).select("-password");

        return {
            token,
            user: userResponse
        };
    }

    async me(userId) {

        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        return user;
    }

}

export default new AuthService();