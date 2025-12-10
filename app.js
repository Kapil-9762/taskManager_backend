import express from 'express';
import cors from 'cors';
const app = express();
import "./connection/connection.js";
import auth from './routes/auth.js'
import listData from './routes/listData.js'
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
app.use(cors());  //cross-origin resource sharing
app.get("/", (req, res) => {
    res.send("hello");
})
app.use("/api/v1", auth);
app.use("/api/v2", listData);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on the port 3000");
});