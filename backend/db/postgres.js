import { Client} from "pg";
import "dotenv/config";
const mypass = process.env.PASSWORD;

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: mypass,
  database: "Todoapp",
});


con.connect().then(()=>{
 console.log("Connected sucessfully !with postgres!");
});




export {Client,con};