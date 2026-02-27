import express from "express";
import noteRouter from "./routes/notes.js";
import mongoose from "mongoose";
import { Post } from "./models/index.js";

// -- ini yang Hello MUTHIE
// belajar init, pidahin type dari common js ke module

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello Muthie !!!");
// });
// app.listen(3000);

const uri =
  "mongodb+srv://muthiekada:muthiekada@cluster0.nuncnce.mongodb.net/?appName=Cluster0";
// const uri = "mongodb://muthiekada:muthiekada@ac-wvhjbbz-shard-00-00.nuncnce.mongodb.net:27017,ac-wvhjbbz-shard-00-01.nuncnce.mongodb.net:27017,ac-wvhjbbz-shard-00-02.nuncnce.mongodb.net:27017/appdb?ssl=true&replicaSet=atlas-cdo6bt-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose
  .connect(uri, {
    family: 4,
    tls: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("Terhubung ke MongoDB Atlas!"))
  .catch((err) => console.error("Gagal Connect:", err));

const app = express();

app.use(express.json());

app.get("/status", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];

  res.send(mongoose.connection.readyState);
});

app.use("/notes", noteRouter);

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});

// -- nyobain middleware
// app.use((req, res, next) => {
//   console.log(`Request ${req.path}`);
//   next();
// });

// -- error handling middleware
// app.use((req, res, next) => {
//   if (false) {
//     next(new Error("Not Authorized"));
//     return;
//   }
//   next();
// });

// app.use((err, req, res, next) => {
//   res.send("Error Occured");
// });

// // -- ini belajar request
// app.get("/", (req, res) => {
//   res.send("OK");
// });

// app.get("/1", (req, res) => {
//   res.send("Ini rute 1");
// });

// app.get("/say/:greeting", (req, res) => {
//   const { greeting } = req.params;
//   res.send(greeting);
// });

// app.listen(8080);

// app.use(auth);
// app.get('/',(req, res, next) => {
//     res.send('Hello Express');
// });
