import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

//utils
import { jsonString } from "./utils/jsonString";

const prisma = new PrismaClient();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/vacancies", async (req, res) => {
  if (!req.query?.q) {
    const vacancies = await prisma.vacancy.findMany();
    res.status(200).json(vacancies);
    return;
  }
  const q = req.query?.q.toString() || "";
  const vacancies = await prisma.vacancy.findMany({
    where: { title: { contains: q } },
  });
  res.status(200).json(vacancies);
});

app.get("/vacancies/:vacancyId", async (req, res) => {
  const vacancyId = Number(req.params.vacancyId);

  const vacancy = await prisma.vacancy.findUnique({
    select: {
      id: true,

      company: {
        select: {
          title: true,
        },
      },
      title: true,
      content: true,
      experience: true,
      location: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    },
    where: { id: vacancyId },
  });

  if (!vacancy) {
    res.status(404).json({ error: "Vacancy not found" });
  } else {
    res.status(200).json(vacancy);
  }
});

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost: ${port}`)
);
