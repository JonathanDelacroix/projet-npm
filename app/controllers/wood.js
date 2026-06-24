import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const wood = await prisma.wood.findMany();

    return res.status(200).json(wood);
  } catch (error) {
    return res.status(500).json({
      error: error.message ?? "An error occured",
    });
  }
};

export const readByHardness = async (req, res) => {
  try {
    const hardness = req.params.hardness;

    const woods = await prisma.wood.findMany({
      where: {
        hardness: hardness,
      },
    });

    return res.status(200).json(woods);
  } catch (error) {
    return res.status(500).json({
      error: error.message ?? "An error occured",
    });
  }
};