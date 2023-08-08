import express, { Express, NextFunction, Request, Response } from "express";

import config from "config";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import routes from "./routes";
import seedSchoolsIntoDatabase from "./seeders/schools";

const app: Express = express();
const port: number = config.get("port");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const startServer = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(config.get("database.connection"));
    console.log("Database connected");
    await seedSchoolsIntoDatabase();
    console.log("Schools Added into database");
  } catch (error) {
    console.log("Database Connection Error", error);
    process.exit(1);
  }
};

startServer();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
