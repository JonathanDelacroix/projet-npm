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

export const create = async (req, res) => {
  try {
    let data;

    // Cas 1 : form-data avec datas
    if (req.body.datas) {
      data = JSON.parse(req.body.datas);
    }
    // Cas 2 : JSON classique
    else {
      data = req.body;
    }

    // Ajout image optionnelle
    if (req.file) {
      data.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newWood = await prisma.wood.create({
      data,
    });

    res.status(201).json(newWood);

  } catch (error) {
    res.status(500).json({
      error: error.message ?? "An error occurred",
    });
  }
};