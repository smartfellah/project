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

  const business = await prisma.role.upsert({
    where: { title: "business" },

    update: {},

    create: {
      title: "business",
    },
  });

  const duNotNice = await prisma.company.upsert({
    where: { title: "Du Not Nice" },

    update: {},

    create: {
      title: "Du Not Nice",

      description:
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. ",

      logo: "",
    },
  });
  const severeTech = await prisma.company.upsert({
    where: { title: "Severe Tech Inc." },

    update: {},

    create: {
      title: "Severe Tech Inc.",

      description:
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. ",

      logo: "",
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

  const johnOm = await prisma.user.upsert({
    where: { email: "johnOm@ghetto.ru" },

    update: {},

    create: {
      email: "johnOm@ghetto.ru",

      username: "johny17",

      password: "password",

      role: {
        connect: { id: business.id },
      },
    },
  });
  const kateWinslet = await prisma.user.upsert({
    where: { email: "winslet@red.com" },

    update: {},

    create: {
      email: "winslet@red.com",

      username: "katy1337",

      password: "password",

      role: {
        connect: { id: business.id },
      },
    },
  });

  const frontend_1 = await prisma.vacancy.create({
    data: {
      title: "Middle-frontend developer",
      content:
        "     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun" +
        "ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae. Ultricies integer quis auctor elit." +
        "Quam id leo in vitae turpis massa sed. Vel fringilla est ullamcorper eget nulla facilisi. " +
        "Mollis aliquam ut porttitor leo a. Senectus et netus et malesuada. " +
        "Venenatis cras sed felis eget velit aliquet. " +
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. " +
        " Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. " +
        " Est ante in nibh mauris cursus mattis molestie a iaculis." +
        "Rhoncus mattis rhoncus urna neque viverra justo. " +
        "      Proin gravida hendrerit lectus a. Egestas quis ipsum suspendisse ultrices. " +
        "A diam maecenas sed enim ut sem viverra aliquet. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. " +
        "Dictum at tempor commodo ullamcorper a. " +
        "Eget egestas purus viverra accumsan in nisl nisi scelerisque. " +
        "Auctor neque vitae tempus quam pellentesque nec nam aliquam. " +
        "       Eu mi bibendum neque egestas congue. Pellentesque habitant morbi tristique senectus et netus." +
        " Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. " +
        "Nisi porta lorem mollis aliquam ut porttitor leo a diam. " +
        "ulla malesuada pellentesque elit eget gravida cum. Enim nulla aliquet porttitor lacus luctus accumsan tortor. " +
        "       Ornare arcu dui vivamus arcu felis bibendum ut tristique. Arcu risus quis varius quam quisque id diam vel. " +
        "Netus et malesuada fames ac turpis egestas. Aliquam ultrices sagittis orci a scelerisque purus." +
        "Felis bibendum ut tristique et egestas.",

      experience: "1-3 years",
      location: "Singapore",
      is_active: true,
      company: {
        connect: { id: duNotNice.id },
      },
      user: {
        connect: { id: johnOm.id },
      },
    },
  });
  const backend_1 = await prisma.vacancy.create({
    data: {
      title: "Junior-backend developer",
      content:
        "     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun" +
        "ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae. Ultricies integer quis auctor elit." +
        "Quam id leo in vitae turpis massa sed. Vel fringilla est ullamcorper eget nulla facilisi. " +
        "Mollis aliquam ut porttitor leo a. Senectus et netus et malesuada. " +
        "Venenatis cras sed felis eget velit aliquet. " +
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. " +
        " Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. " +
        " Est ante in nibh mauris cursus mattis molestie a iaculis." +
        "Rhoncus mattis rhoncus urna neque viverra justo. " +
        "      Proin gravida hendrerit lectus a. Egestas quis ipsum suspendisse ultrices. " +
        "A diam maecenas sed enim ut sem viverra aliquet. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. " +
        "Dictum at tempor commodo ullamcorper a. " +
        "Eget egestas purus viverra accumsan in nisl nisi scelerisque. " +
        "Auctor neque vitae tempus quam pellentesque nec nam aliquam. " +
        "       Eu mi bibendum neque egestas congue. Pellentesque habitant morbi tristique senectus et netus." +
        " Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. " +
        "Nisi porta lorem mollis aliquam ut porttitor leo a diam. " +
        "ulla malesuada pellentesque elit eget gravida cum. Enim nulla aliquet porttitor lacus luctus accumsan tortor. " +
        "       Ornare arcu dui vivamus arcu felis bibendum ut tristique. Arcu risus quis varius quam quisque id diam vel. " +
        "Netus et malesuada fames ac turpis egestas. Aliquam ultrices sagittis orci a scelerisque purus." +
        "Felis bibendum ut tristique et egestas.",

      experience: "Not required",
      location: "Singapore",
      is_active: true,
      company: {
        connect: { id: duNotNice.id },
      },
      user: {
        connect: { id: johnOm.id },
      },
    },
  });

  const constructionSiteWorker1 = await prisma.vacancy.create({
    data: {
      title: "Construction site worker",
      content:
        "     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun" +
        "ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae. Ultricies integer quis auctor elit." +
        "Quam id leo in vitae turpis massa sed. Vel fringilla est ullamcorper eget nulla facilisi. " +
        "Mollis aliquam ut porttitor leo a. Senectus et netus et malesuada. " +
        "Venenatis cras sed felis eget velit aliquet. " +
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. " +
        " Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. " +
        " Est ante in nibh mauris cursus mattis molestie a iaculis." +
        "Rhoncus mattis rhoncus urna neque viverra justo. " +
        "      Proin gravida hendrerit lectus a. Egestas quis ipsum suspendisse ultrices. " +
        "A diam maecenas sed enim ut sem viverra aliquet. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. " +
        "Dictum at tempor commodo ullamcorper a. " +
        "Eget egestas purus viverra accumsan in nisl nisi scelerisque. " +
        "Auctor neque vitae tempus quam pellentesque nec nam aliquam. " +
        "       Eu mi bibendum neque egestas congue. Pellentesque habitant morbi tristique senectus et netus." +
        " Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. " +
        "Nisi porta lorem mollis aliquam ut porttitor leo a diam. " +
        "ulla malesuada pellentesque elit eget gravida cum. Enim nulla aliquet porttitor lacus luctus accumsan tortor. " +
        "       Ornare arcu dui vivamus arcu felis bibendum ut tristique. Arcu risus quis varius quam quisque id diam vel. " +
        "Netus et malesuada fames ac turpis egestas. Aliquam ultrices sagittis orci a scelerisque purus." +
        "Felis bibendum ut tristique et egestas.",

      experience: "Not required",
      location: "Kazan",
      is_active: true,
      company: {
        connect: { id: severeTech.id },
      },
      user: {
        connect: { id: kateWinslet.id },
      },
    },
  });

  const manager1 = await prisma.vacancy.create({
    data: {
      title: "Office manager",
      content:
        "     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun" +
        "ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae. Ultricies integer quis auctor elit." +
        "Quam id leo in vitae turpis massa sed. Vel fringilla est ullamcorper eget nulla facilisi. " +
        "Mollis aliquam ut porttitor leo a. Senectus et netus et malesuada. " +
        "Venenatis cras sed felis eget velit aliquet. " +
        "     Interdum velit laoreet id donec ultrices tincidunt arcu non. " +
        "Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum." +
        "A diam sollicitudin tempor id eu nisl. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. " +
        " Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. " +
        " Est ante in nibh mauris cursus mattis molestie a iaculis." +
        "Rhoncus mattis rhoncus urna neque viverra justo. " +
        "      Proin gravida hendrerit lectus a. Egestas quis ipsum suspendisse ultrices. " +
        "A diam maecenas sed enim ut sem viverra aliquet. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. " +
        "Dictum at tempor commodo ullamcorper a. " +
        "Eget egestas purus viverra accumsan in nisl nisi scelerisque. " +
        "Auctor neque vitae tempus quam pellentesque nec nam aliquam. " +
        "       Eu mi bibendum neque egestas congue. Pellentesque habitant morbi tristique senectus et netus." +
        " Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. " +
        "Nisi porta lorem mollis aliquam ut porttitor leo a diam. " +
        "ulla malesuada pellentesque elit eget gravida cum. Enim nulla aliquet porttitor lacus luctus accumsan tortor. " +
        "       Ornare arcu dui vivamus arcu felis bibendum ut tristique. Arcu risus quis varius quam quisque id diam vel. " +
        "Netus et malesuada fames ac turpis egestas. Aliquam ultrices sagittis orci a scelerisque purus." +
        "Felis bibendum ut tristique et egestas.",

      experience: "6 and more",
      location: "Reutov",
      is_active: true,
      company: {
        connect: { id: severeTech.id },
      },
      user: {
        connect: { id: kateWinslet.id },
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
