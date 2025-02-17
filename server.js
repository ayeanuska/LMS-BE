import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import morgan from "morgan";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRouter from "./src/routes/authRouter.js";

//for req.body
const app = express();
const PORT = process.env.PORT || 9002;

app.use(express.json());

//log middle ware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

//request body parser
app.use(cors());

//route
app.get("/", (req, res) => {
  res.json({
    message: "its live",
  });
});

//auth route
app.use("/api/v1/auth", authRouter);

//error handler
app.use(errorHandler);

///database comnnection
connectMongoDB()
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
