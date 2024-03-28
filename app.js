const express = require("express");
const { MongoClient } = require("mongodb");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 8000;

const uri = "mongodb://127.0.0.1:27017/node-crud";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    const db = client.db();
    console.log(db);
    app.use(express.json());
    app.use("/api/users", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server started at PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
