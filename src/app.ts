import path from "path";
import fs from "fs";
import { Express } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db";
import injectMiddleWares from "./middlewares";
import injectRoutes from "./routes";
import swaggerSpec from "./config/swagger";

export const startApp = async (app:Express, PORT:number|string) => {
  dotenv.config();
  await connectDB();
  injectMiddleWares(app);
  injectRoutes(app);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  const frontendDesignHtml = fs.readFileSync(
    path.join(__dirname, "..", "docs", "frontend-pages-design.html"),
    "utf-8"
  );
  app.get("/docs/frontend-pages-design.html", (_req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(frontendDesignHtml);
  });
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
    console.log(`Frontend page designs available at http://localhost:${PORT}/docs/frontend-pages-design.html`);
  });
}

export default startApp;
