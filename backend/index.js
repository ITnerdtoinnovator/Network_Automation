import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.js";
import { PORT } from "./utils/envVariables.js";
import { spawn } from "child_process";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/api/stream-script", (req, res) => {
    const { scriptName } = req.query;

    if (!scriptName) {
        return res.status(400).json({ message: "Script name is required" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const script = spawn("python3", [`scripts/${scriptName}.py`]);

    script.stdout.on("data", (data) => {
        console.log(data.toString());
        res.write(`data: ${data.toString()}\n\n`);
    });

    script.stderr.on("data", (data) => {
        console.error(data.toString());
        res.write(`data: ERROR: ${data.toString()}\n\n`);
    });

    script.on("close", (code) => {
        res.write(`data: Script finished with exit code ${code}\n\n`);
        res.write("event: end\ndata: Script execution completed\n\n");
        res.end();
    });

    script.on("error", (err) => {
        console.error(err.message);
        res.write(`data: ERROR: ${err.message}\n\n`);
        res.end();
    });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
