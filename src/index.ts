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

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost: ${port}`)
);
