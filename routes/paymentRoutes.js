import express from "express";
import { createTransaction } from "../midtrans/midtrans.js"; // Sesuaikan path-nya

const router = express.Router();

// Route untuk membuat transaksi
router.post("/checkout", createTransaction);

// create
// router.post("/create", createTransaction);

// notif
//router.post("/notification", handleNotification);
export default router;