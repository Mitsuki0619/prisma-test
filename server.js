const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.get("/post/", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});
app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const posts = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(posts);
});

app.post("/post/", async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: { title: title, content: content, authorId: authorId },
  });
  return res.json(post);
});
app.put("/post/:id", async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      content: content,
    },
  });
  return res.json(updatedPost);
});

app.post("/register/", async (req, res) => {
  const { email, username } = req.body;
  const user = await prisma.user.create({
    data: {
      email: email,
      name: username,
    },
  });
  return res.json(user);
});

app.listen(PORT, () => {
  console.log("server is running");
});

app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(deletedPost);
});
