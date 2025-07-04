import { Router } from "express";
import { con } from "../db/postgres.js";

const deleterouter = Router();

deleterouter.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  
  console.log(`Attempting to delete task with ID: ${id}`); // Add log to trace the request

  const deleteval = 'DELETE FROM mytodo WHERE id = $1';

  con.query(deleteval, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ msg: 'Error deleting task, please try again later.' });
    }

    if (result.rowCount > 0) {
      console.log(`Task with ID: ${id} deleted successfully.`);
      res.status(200).json({ msg: "Data deleted successfully" });
    } else {
      console.log(`No task found with ID: ${id}`);
      res.status(404).json({ msg: `No task found with ID: ${id}` });
    }
  });
});


export default deleterouter;
