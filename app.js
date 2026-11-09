const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());

app.use(logger);

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Student Management REST API is running");
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});