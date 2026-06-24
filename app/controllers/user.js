import { prisma } from "../../app.js";

export const signup = async (req, res) => {
    try {
    const user = await prisma.user.create({
        data: req.body,
    });

    return res.status(201).json(user);

    } catch (error) {
    console.error(error);

    return res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message ?? "Erreur inconnue",
    });
    }
};

export const login = (req, res) => {
    res.send('You are login');
};