import { Router } from "express";
import { Post } from "../models/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// [GET] Ambil semua catatan
router.get("/", authMiddleware, async (req, res) => {
  try {
    // PERBAIKAN: Gunakan req.user.id agar konsisten dengan saat simpan data
    const notes = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [POST] Tambah catatan baru
router.post("/", authMiddleware, async (req, res) => {
  try {
    // PERBAIKAN: title dan content diambil dari req.body, bukan req.user.id
    const { title, content } = req.body;

    const newNote = await Post.create({
      title,
      content,
      author: req.user.id, // ID diambil otomatis dari token
    });

    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [PUT] Update catatan
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // PERBAIKAN: Ambil data baru dari req.body
    const { title, content } = req.body;

    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id }, // Cari berdasarkan ID Note dan ID Pemilik
      { title, content },
      { new: true },
    );

    if (!updated)
      return res
        .status(404)
        .json({ error: "Note tidak ditemukan atau Anda tidak punya akses" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [DELETE] Hapus catatan
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ error: "Note tidak ditemukan atau Anda tidak punya akses" });

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

// import { Router } from "express";
// import { Post } from "../models/index.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = Router();

// // Rahasia untuk JWT (Sebaiknya simpan di .env nanti)
// const JWT_SECRET = "MUTHIE_RAHASIA_NEGARA_123";

// // [GET] Ambil semua catatan (Hanya milik user yang sedang login)
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     // Filter berdasarkan author: req.user.id agar data tidak bercampur dengan user lain
//     const notes = await Post.find({ author: req.user.username }).sort({
//       createdAt: -1,
//     });
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // [POST] Tambah catatan baru
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { title, content } = req.user.id;

//     // Author diambil otomatis dari req.user.id (hasil verifikasi token di middleware)
//     const newNote = await Post.create({
//       title,
//       content,
//       author: req.user.id,
//     });

//     res.status(201).json(newNote);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [PUT] Update catatan
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { title, content } = req.user.id;

//     // Kita pastikan yang update adalah pemilik catatannya
//     const updated = await Post.findOneAndUpdate(
//       { _id: req.params.id, author: req.user.username }, // Cari berdasarkan ID Note DAN ID User
//       { title, content },
//       { new: true },
//     );

//     if (!updated)
//       return res
//         .status(404)
//         .json({ error: "Note tidak ditemukan atau Anda tidak punya akses" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [DELETE] Hapus catatan
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     // Kita pastikan yang hapus adalah pemilik catatannya
//     const deleted = await Post.findOneAndDelete({
//       _id: req.params.id,
//       author: req.user.id,
//     });

//     if (!deleted)
//       return res
//         .status(404)
//         .json({ error: "Note tidak ditemukan atau Anda tidak punya akses" });
//     res.json({ message: "Note deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;

// // [GET] Ambil semua catatan
// router.get("/", async (req, res) => {
//   try {
//     // Menambahkan sort({ createdAt: -1 }) agar catatan terbaru muncul paling atas
//     const notes = await Post.find().sort({ createdAt: -1 });
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // [POST] Tambah catatan baru
// router.post("/", async (req, res) => {
//   try {
//     const { title, content, author } = req.body; // Ambil author dari frontend
//     const newNote = await Post.create({ title, content, author });
//     res.status(201).json(newNote);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [PUT] Update catatan
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, content, author } = req.body; // Ambil author untuk update
//     const updated = await Post.findByIdAndUpdate(
//       req.params.id,
//       { title, content, author },
//       { new: true }, // 'new: true' agar mengembalikan data setelah diupdate
//     );
//     if (!updated) return res.status(404).json({ error: "Note not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [DELETE] Hapus catatan
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Post.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Note not found" });
//     res.json({ message: "Note deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;

// ------------------------

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
