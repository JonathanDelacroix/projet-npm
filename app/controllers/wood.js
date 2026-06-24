import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
  try {
    const wood = await prisma.wood.findMany();

    return res.status(200).json(wood);
  } catch (error) {
    return res.status(500).json({
      error: error.message ?? "An error occured",
    });
  }
};