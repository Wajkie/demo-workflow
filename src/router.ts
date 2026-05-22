import { Router, Request, Response } from "express";
import { getUsers, getUserById, createUser, deleteUser } from "./users.js";
import { logger } from "./logger.js";

export const router = Router();

router.get("/users", (_req: Request, res: Response) => {
  const users = getUsers();
  logger.info({ msg: "list users", count: users.length });
  res.json(users);
});

router.get("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params["id"] ?? "", 10);
  const user = getUserById(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

router.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body as { name: string; email: string };
  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const user = createUser(name, email);
  logger.info({ msg: "created user", id: user.id });
  res.status(201).json(user);
});

router.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params["id"] ?? "", 10);
  const removed = deleteUser(id);
  if (!removed) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  logger.info({ msg: "deleted user", id });
  res.status(204).end();
});
