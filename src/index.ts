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
app.get("/vacancy-suggestions", async (req, res) => {
  const { q } = req.query;

  // const where = q
  //   ? { title: { contains: q.toString(), mode: "insensitive" } }
  //   : {};

  const suggestions = await prisma.vacancy.findMany({
    where: {
      title: { contains: q.toString(), mode: "insensitive" },
    },
    take: 5, // Limit the number of suggestions to 5
    select: {
      title: true,
    },
  });

  res.status(200).json({ suggestions });
});

app.get("/vacancies", async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = q ? { title: { contains: q.toString() } } : {};

  const totalCount = await prisma.vacancy.count({ where });
  const totalPages = Math.ceil(totalCount / Number(limit));

  const vacancies = await prisma.vacancy.findMany({
    where,
    skip,
    take,
  });

  res.status(200).json({
    vacancies,
    totalCount,
    totalPages,
    currentPage: page,
  });
});

app.get("/vacancies/:vacancyId", async (req, res) => {
  const vacancyId = Number(req.params.vacancyId);

  const vacancy = await prisma.vacancy.findUnique({
    select: {
      id: true,

      company: {
        select: {
          title: true,
          logo: true,
          description: true,
        },
      },
      salary: true,
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
