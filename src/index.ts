import express from "express";
import { router } from "./router.js";
import { logger } from "./logger.js";

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = parseInt(process.env["PORT"] ?? "3000", 10);
app.listen(PORT, () => {
  logger.info({ msg: "Server started", port: PORT });
});
