import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const wood = await prisma.wood.findMany();

    const woodsWithLinks = wood.map((wood) => ({
      ...wood,
      links: {
        self: `${req.protocol}://${req.get("host")}/api/woods/${wood.id}`,
        sameHardness: `${req.protocol}://${req.get("host")}/api/woods/hardness/${wood.hardness}`,
      },
    }));

    return res.status(200).json(woodsWithLinks);
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

    const woodsWithLinks = woods.map((wood) => ({
      ...wood,
      links: {
        self: `${req.protocol}://${req.get("host")}/api/woods/${wood.id}`,
        sameHardness: `${req.protocol}://${req.get("host")}/api/woods/hardness/${wood.hardness}`,
      },
    }));

    return res.status(200).json(woodsWithLinks);
  } catch (error) {
    return res.status(500).json({
      error: error.message ?? "An error occured",
    });
  }
};

export const create = async (req, res) => {
  try {
    let data;

    if (req.body.datas) {
      data = JSON.parse(req.body.datas);
    } else {
      data = req.body;
    }

    if (req.file) {
      data.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newWood = await prisma.wood.create({
      data,
    });

    const woodWithLinks = {
      ...newWood,
      links: {
        self: `${req.protocol}://${req.get("host")}/api/woods/${newWood.id}`,
        sameHardness: `${req.protocol}://${req.get("host")}/api/woods/hardness/${newWood.hardness}`,
      },
    };

    return res.status(201).json(woodWithLinks);

  } catch (error) {
    return res.status(500).json({
      error: error.message ?? "An error occurred",
    });
  }
};