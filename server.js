
import app from "./app.js";
import connectDB from './database/db.js';

// Call the connectDB function to establish the database connection
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log("App listening");
});
