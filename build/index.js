import "dotenv/config";
import express from "express";
import { isDatabaseConfigured, testDatabaseConnection } from "./src/db.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check db route
app.get("/db-health", (_req, res) => {
    if (!isDatabaseConfigured()) {
        res.status(503).json({
            error: "Database not configured",
            message: "Database URL environment variable is not set",
            timestamp: new Date().toISOString(),
        });
        return;
    }
    testDatabaseConnection()
        .then((result) => {
        if (result) {
            res.json({ status: "OK", timestamp: new Date().toISOString() });
        }
        else {
            console.error("Unable to connect to the database");
            res.status(500).json({ error: "Database connection failed" });
        }
    })
        .catch((error) => {
        console.error("Unable to connect to the database:", error);
        res.status(500).json({ error: "Database connection failed" });
    });
});
// Health check route
app.get("/health", (_req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Start server
app.listen(PORT, () => {
    console.log(`🐼 Server Panda is running on port ${PORT}. http://localhost:${PORT}`);
});
export default app;
