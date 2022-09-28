const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.post("/post/", async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: { title: title, content: content, authorId: authorId },
  });
  return res.json(post);
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
