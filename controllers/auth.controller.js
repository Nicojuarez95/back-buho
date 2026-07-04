import authService from "../services/auth.service.js";

export const register = async (req, res) => {

    try {

        const user = await authService.register(req.body);

        res.status(201).json({
            ok: true,
            user
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            message: error.message
        });

    }

}

export const login = async (req, res) => {

    try {

        const result = await authService.login(
            req.body.email,
            req.body.password
        );

        res.json({
            ok: true,
            ...result
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            message: error.message
        });

    }

}

export const me = async (req, res) => {

    try {

        const user = await authService.me(req.user._id);

        res.json({
            ok: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}