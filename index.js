import express from "express";

// -- ini yang Hello MUTHIE
// belajar init, pidahin type dari common js ke module

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello Muthie !!!");
// });
// app.listen(3000);

const app = express();

// -- nyobain middleware
// app.use((req, res, next) => {
//   console.log(`Request ${req.path}`);
//   next();
// });

// -- error handling middleware
app.use((req, res, next) => {
  if (true) {
    next(new Error("Not Authorized"));
    return;
  }
  next();
});

app.use((err, req, res, next) => {
  res.send("Error Occured");
});

// -- ini belajar request
app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/say/:greeting", (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

app.listen(8080);

// app.use(auth);
// app.get('/',(req, res, next) => {
//     res.send('Hello Express');
// });
