import { Hono } from "hono";
import { cors } from "hono/cors";
import { faker } from "@faker-js/faker";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(cors());
app.use(logger());

const listOfUsers = (length: number) => {
  return Array.from({ length }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    picture: faker.image.avatar(),
  }));
};

const users = listOfUsers(1000);

app.get("/", async (c) => {
  const { page = 1, limit = 10 } = c.req.query();

  const skip: number = ((Number(page) - 1) * Number(limit)) as number;
  const numberOfItems = skip + Number(limit);

  const data = users.slice(skip, numberOfItems);

  const totalPages = Math.ceil(users.length / Number(limit));

  return c.json({
    data,
    totalPages,
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
