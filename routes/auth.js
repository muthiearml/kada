import { Router } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // [1] Import jwt

const router = Router();

// ---------------------

// [POST] SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Simpan ke MongoDB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User berhasil dibuat" });
  } catch (err) {
    // Cek jika errornya karena username/email sudah ada (Duplicate Key)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username atau Email sudah terdaftar!" });
    }
    res.status(400).json({ error: err.message });
  }
});

// [POST] LOGIN
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // 1. Cari user berdasarkan email ATAU username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(400).json({ message: "Username / Password salah" });
    }

    // 2. Cek Password (Bandingkan hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Username / Password salah" });
    }

    // 3. Buat JWT Token [PENTING]
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Data yang disimpan di token
      JWT_SECRET, // Kunci rahasia
      { expiresIn: "1d" }, // Masa berlaku (1 hari)
    );

    // 4. Kirim respon beserta tokennya
    res.json({
      message: "Login Berhasil",
      token: token, // Kirim token ke frontend
      user: { username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// ---------------

// import { Router } from "express";
// import { User } from "../models/index.js";
// import bcrypt from "bcrypt";

// const router = Router();

// // [POST] SIGN UP
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // // 1. Validasi Confirm Password
//     // if (password !== confirmPassword) {
//     //   return res.status(400).json({ message: "Password tidak cocok" });
//     // }

//     // 2. Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 3. Simpan ke MongoDB
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User berhasil dibuat" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // [POST] LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { emailOrUsername, password } = req.body;

//     // Cari user berdasarkan email ATAU username
//     const user = await User.findOne({
//       $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Username / Password salah" });
//     }

//     // Cek Password (Bandingkan hash)
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Username / Password salah" });
//     }

//     res.json({ message: "Login Berhasil", user: { username: user.username } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
