import { Router } from "express";
import { con } from "../db/postgres.js";
const addrouter = Router();

addrouter.post("/add", (req, res) => {
  const {tasktodo} = req.body;

  try {
    const addvalue = 'insert into mytodo (tasktodo) values ($1)';
    con.query(addvalue, [tasktodo], (err, result) => {
      if (err) {
        res.status(500).json({ msg: `There is some internal ${err}` });
      } else {
       

        res.status(200).json({ msg: "Data send sucessfully!" });
            
      }
    });
  } catch (err) {
    console.log(`There is some error occured ${err}`);
    
  }
});

export default addrouter;
