// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "MUTHIE_RAHASIA_NEGARA_123"; // Harus sama dengan di auth.js

export const authMiddleware = (req, res, next) => {
  // 1. Ambil token dari header 'Authorization'
  // Formatnya biasanya: "Bearer <token>"
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // 2. Jika tidak ada token
  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada!" });
  }

  try {
    // 3. Verifikasi token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 4. Simpan data user (id & username) ke dalam req agar bisa dipakai di notes.js
    req.user = decoded;
    
    // 5. Lanjut ke fungsi berikutnya
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid atau kadaluarsa!" });
  }
};