const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes")
require("dotenv").config()

const port = process.env.PORT

app.use(cors({
    origin: "https://educase-react-js-assignment-fronten.vercel.app",
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)

app.get("/", (req, res) => {
    res.send("hello world")
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB:", err.message);
});