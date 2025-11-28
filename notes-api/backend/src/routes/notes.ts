import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = await prisma.note.create({ data: { title, content } });
  res.json(note);
});

// READ ALL
router.get("/", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const note = await prisma.note.findUnique({ where: { id } });
  res.json(note);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const updated = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Notes not found" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.note.delete({ where: { id } });
  res.json({ message: "Note deleted" });
});

export default router;
