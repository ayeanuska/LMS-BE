import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import morgan from "morgan";
import { errorHandler } from "./src/middlewares/errorHandler.js";

//router
import authRouter from "./src/routes/authRouter.js";
import bookRouter from "./src/routes/bookRouter.js";
import borrowRouter from "./src/routes/borrowRouter.js";
import usersRoute from "./src/routes/usersRouter.js";

//for req.body
const app = express();
const PORT = process.env.PORT || 9002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//log middle ware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

//request body parser
app.use(cors());

//auth route
app.use("/api/v1/auth", authRouter);

//user route
app.use("/api/v1/users", usersRoute);
//book route
app.use("/api/v1/books", bookRouter);

//borrow route
app.use("/api/v1/borrows", borrowRouter);

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
