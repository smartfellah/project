// prisma/seed/seed.ts
import {
  Prisma,
  PrismaClient,
  Role,
  User,
  Company,
  Vacancy,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  // Create roles
  const applicantRole = await prisma.role.create({
    data: { title: "applicant" },
  });

  const businessRole = await prisma.role.create({
    data: { title: "business" },
  });

  // Create users with roles
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const roleId = i < 5 ? applicantRole.id : businessRole.id;

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        roleId,
      },
    });

    users.push(user);
  }

  // Create companies
  const companies: Company[] = [];
  for (let i = 0; i < 4; i++) {
    const title = faker.company.name();
    const description = faker.company.catchPhrase();
    const logo = faker.image.url();

    const company = await prisma.company.create({
      data: {
        title,
        description,
        logo,
      },
    });

    companies.push(company);
  }

  // Create vacancies
  for (let i = 0; i < 20; i++) {
    const user = faker.helpers.arrayElement(users);
    const company = faker.helpers.arrayElement(companies);
    const salary = faker.finance.amount(20000, 100000, 0, "$");
    const title = faker.person.jobTitle();
    const content = faker.lorem.paragraphs();
    const experience = faker.lorem.sentence();
    const location = faker.location.city();
    const is_active = true;

    await prisma.vacancy.create({
      data: {
        userId: user.id,
        companyId: company.id,
        salary,
        title,
        content,
        experience,
        location,
        is_active,
      },
    });
  }

  console.log("Seeder executed successfully!");

  await prisma.$disconnect();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
