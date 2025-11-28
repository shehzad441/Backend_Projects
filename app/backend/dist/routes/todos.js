import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import db from "../db.js";
const router = Router();
const dbRun = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(this.lastID);
            }
        });
    });
};
const dbGet = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
};
const dbAll = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const todos = await dbAll(`SELECT * FROM todos WHERE userId = ? ORDER BY id DESC`, [req.userId]);
        res.json(todos);
    }
    catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!title) {
            return res.status(400).json({ message: "Title required" });
        }
        const lastID = await dbRun(`INSERT INTO todos (userId, title) VALUES (?, ?)`, [req.userId, title]);
        res.json({ id: lastID, title, completed: 0 });
    }
    catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await dbGet(`SELECT * FROM todos WHERE id = ? AND userId = ?`, [id, req.userId]);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const completedValue = typeof completed === "boolean"
            ? Number(completed)
            : typeof completed === "number"
                ? Number(Boolean(completed))
                : todo.completed;
        await dbRun(`UPDATE todos SET title = ?, completed = ? WHERE id = ?`, [title ?? todo.title, completedValue, id]);
        res.json({ message: "Todo updated" });
    }
    catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const todo = await dbGet(`SELECT * FROM todos WHERE id = ? AND userId = ?`, [id, req.userId]);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await dbRun(`DELETE FROM todos WHERE id = ?`, [id]);
        res.json({ message: "Todo deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
});
export default router;
