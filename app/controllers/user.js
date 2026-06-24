import bcrypt from "bcrypt";
import { prisma } from "../../app.js";

export const signup = async (req, res) => {
    try {
            const { password, ...userData } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
            });

            return res.status(201).json(user);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message ?? "An error occured",
        });
    }
};

export const login = (req, res) => {
    res.send('You are login');
};