import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();

const port = process.env.PORT || 8080;
const secretKey = process.env.JWT_SECRET_KEY || "secret";

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  res.status(200).json({ token, username: user.username, email: user.email });
});

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const applicantRole = await prisma.role.findUnique({
    where: {
      title: "applicant",
    },
  });

  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      email: email,
      role: {
        connect: { id: applicantRole.id },
      },
    },
  });

  const token = jwt.sign({ userId: newUser.id }, secretKey, {
    expiresIn: "1h",
  });

  res.status(201).json({ token, username, email });
});

interface CustomRequest extends Request {
  userId: number;
}

const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.put(
  "/api/user",
  authenticate,
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { name, email } = req.body as { name: string; email: string };

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { username: name, email },
      });

      res
        .status(200)
        .json({ message: "User info updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Failed to update user info", error);
      res.status(500).json({ error: "Failed to update user info" });
    }
  }
);

app.get(
  "/protected-route",
  authenticate,
  (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    res.status(200).json({ userId });
  }
);

app.get("/vacancy-suggestions", async (req, res) => {
  const { q } = req.query;

  // const where = q
  //   ? { title: { contains: q.toString(), mode: "insensitive" } }
  //   : {};

  const suggestions = await prisma.vacancy.findMany({
    where: {
      title: { startsWith: q.toString(), mode: "insensitive" },
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
