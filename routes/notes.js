import { Router } from "express";
import { Post } from "../models/index.js";

const router = Router();

// [GET] Ambil semua catatan dari MongoDB
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const notes = await Post.find(); // Pakai Post.find()
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [GET] Ambil satu berdasarkan ID MongoDB
router.get("/:id", async (req, res) => {
  try {
    const note = await Post.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// [POST] Tambah catatan baru (Sudah Benar!)
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Post.create({ title, content });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [PUT] Update catatan di MongoDB
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updated) return res.status(404).json({ error: "Note not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [DELETE] Hapus catatan di MongoDB
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

// import { Router } from "express";
// import * as Note from "../models/note.js";
// import { Post } from "../models/index.js";

// const router = Router();

// router.get("/", (req, res, next) => {
//   const notes = Note.list();
//   res.json(notes);
// });

// // [GET] Ambil satu catatan berdasarkan ID
// router.get("/:id", (req, res) => {
//   const note = Note.get(req.params.id);
//   if (!note) return res.status(404).json({ error: "Note not found" });
//   res.json(note);
// });

// // [POST] Tambah catatan baru
// router.post("/", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     // Perbaikan: Bungkus title dan content dalam satu object { }
//     const newNote = await Post.create({ title, content });
//     res.status(201).json(newNote);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [PUT] Update catatan
// router.put("/:id", (req, res) => {
//   const { title, content } = req.body;
//   const updated = Note.update(req.params.id, title, content);
//   if (!updated) return res.status(404).json({ error: "Note not found" });
//   res.json(updated);
// });

// // [DELETE] Hapus catatan
// router.delete("/:id", (req, res) => {
//   const deleted = Note.remove(req.params.id);
//   if (!deleted) return res.status(404).json({ error: "Note not found" });
//   res.json({ message: "Note deleted successfully" });
// });

// export default router;
