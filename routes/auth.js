import { Router } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const router = Router();

// [POST] SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // 1. Validasi Confirm Password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password tidak cocok" });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke MongoDB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User berhasil dibuat" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [POST] LOGIN
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Cari user berdasarkan email ATAU username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
      return res.status(400).json({ message: "Username / Password salah" });
    }

    // Cek Password (Bandingkan hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Username / Password salah" });
    }

    res.json({ message: "Login Berhasil", user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;