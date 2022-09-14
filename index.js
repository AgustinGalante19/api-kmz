import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import multer from "./libs/multer.js"
import uploadController from "./controllers/uploadController.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))

app.use("/temp", express.static(path.resolve("temp")))

app.set("port", process.env.PORT || 5000)

app.get("/", (req, res) => {
    res.send("kmz api by agustin galante")
})

app.post("/put", (req, res) => {
    res.json({
        message: "ok",
        result: 1,
    })
})

app.post("/upload", multer.single("archivo"), uploadController)

app.listen(process.env.PORT || app.get("port"), () => {
    console.log("server on port 5000")
})
