import { PrismaClient } from "../generated/prisma";

import { prisma } from "../app";

const woods = [
  {
    name: "Épicéa",
    type: "softwood",
    hardness: "tender",
  },
  {
    name: "Pin",
    type: "softwood",
    hardness: "medium_hard",
  },
  {
    name: "Padouk",
    type: "exotic_wood",
    hardness: "hard",
  },
  {
    name: "Érable",
    type: "noble_and_hardwoods",
    hardness: "medium_hard",
  },
  {
    name: "Hêtre",
    type: "noble_and_hardwoods",
    hardness: "medium_hard",
  },
  {
    name: "Itauba",
    type: "exotic_wood",
    hardness: "hard",
  },
  {
    name: "Douglas",
    type: "softwood",
    hardness: "tender",
  },
];

async function main() {
  await prisma.wood.createMany({
    data: woods,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });