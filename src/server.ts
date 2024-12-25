import express from "express";
import startApp from "./app";
import appConfig from "./config/app-config";

const PORT = appConfig.port
const app = express();

startApp(app, PORT);