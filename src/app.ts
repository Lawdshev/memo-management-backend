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
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
  });
}

export default startApp;
