import { con } from "../db/postgres.js";
import { Router } from "express";
const usertodorouter = Router();

usertodorouter.get("/todo", async (req, res) => {
  const showtodo = "select * from mytodo";
  con.query(showtodo, (err, result) => {
    if (err) {
     return  res.status(400).json({ msg: "There is some error internally" });
    }
    if (result.rowCount < 1) {
    return   res.status(404).json({ msg: "Error ! There is no todo " });
    }

    const tasklist = result.rows.map((items) => {
      return { tasktodo: items.tasktodo ,
        id:items.id
      };
    });
    return res.json(tasklist);
  });
});

export default usertodorouter;
