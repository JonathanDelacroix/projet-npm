import { prisma } from "../app";

async function main() {
    // User
    await prisma.user.upsert({
        where: {
            email: "john.doe@mail.com",
        },
        update: {}, // Ne rien changer si l'utilisateur existe déjà
        create: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@mail.com",
            password: "123456",
        }
    });

    // Woods
    await prisma.wood.createMany({
        data: [
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
            }
        ],
        skipDuplicates: true
    })
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());