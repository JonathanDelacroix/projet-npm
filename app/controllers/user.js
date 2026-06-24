import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import bcrypt from "bcrypt";
import { prisma } from "../../app.js";

const signAsync = promisify(jwt.sign);

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        const token = await signAsync(
            { id: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: Number(process.env.JWT_EXPIRATION) }
        );

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message ?? "An error occurred",
        });
    }
};