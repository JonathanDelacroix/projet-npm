import { prisma } from "../../app.js";

export const signup = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });

        res.send(user);
    } catch (error) {
        res.send(error);
    }
};

export const login = (req, res) => {
    res.send('You are login');
};