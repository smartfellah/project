import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const worker = await prisma.role.upsert({
    where: { title: "worker" },

    update: {},

    create: {
      title: "worker",
    },
  });

  const johnDoe = await prisma.user.upsert({
    where: { email: "johndoe@yandex.ru" },

    update: {},

    create: {
      email: "johndoe@yandex.ru",

      username: "johndoe",

      password: "password",

      role: {
        connect: { id: worker.id },
      },
    },
  });

  const janeDoe = await prisma.user.upsert({
    where: { email: "janedoe@yandex.ru" },

    update: {},

    create: {
      email: "janedoe@yandex.ru",

      username: "janedoe",

      password: "password",

      role: {
        connect: { id: worker.id },
      },
    },
  });

  const yannCist = await prisma.user.upsert({
    where: { email: "yannCist@gmail.ru" },

    update: {},

    create: {
      email: "yannCist@ygmail.ru",

      username: "yannCist228",

      password: "password",

      role: {
        connect: { id: worker.id },
      },
    },
  });

  console.log({ johnDoe, janeDoe });
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
