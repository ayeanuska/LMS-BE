import express from "express";
import cors from "cors";
//for req.body
const app = express();
const PORT = process.env.PORT || 9002;

app.use(express.json());
app.use(cors());

//route
app.get("/", (req, res) => {
  res.json({
    message: "its live",
  });
});

///database comnnection
connectMongoDb()
  .then(() => {
    //db succesful
    console.log("connected to db");
    // start server
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server running at http://localhost:${PORT}`);
    });
  })

  .catch((error) => {
    //db error
    console.log(error);
    console.log("Error Connecting to Db");
  });
