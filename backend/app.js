import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));


app.get("/", (req, res) => {
  res.send("Hy i am running here!");
});



//router
import usertodorouter from "./router/usertodo.js";
import addrouter from "./router/Addtodo.js";
import deleterouter from "./router/deletetodo.js";
app.use("/my",usertodorouter);
app.use("/todo", addrouter);
app.use("/todo",deleterouter);

export { app };
