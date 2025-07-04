import { app } from "./app.js";
import { Client } from "./db/postgres.js";
import "dotenv/config";
const port = process.env.PORT || 6000;





app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});
