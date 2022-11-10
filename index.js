const express = require("express");
const { connection } = require("./Config/db");
const { authetication } = require("./Middlewares/Authetication");
const { todoController } = require("./Routes/Todos.Route");

const { userController } = require("./Routes/User.Route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  console.log("HomePage");
  res.send("HomePage");
});

app.use("/user", userController);
app.use(authetication);
app.use("/todo", todoController);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Mongo Database");
  } catch (err) {
    console.log("Not Connected to Database");
  }
  console.log("Listening on port 8080");
});
