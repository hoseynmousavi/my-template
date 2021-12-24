const express = require("express")
const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
dotenv.config({path: path.resolve(process.cwd(), ".env")})

app.route("/static/:folder/:file").get((req, res) =>
{
    if (fs.existsSync(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}`)))
    {
        res.setHeader("Vary", "Accept-Encoding")
        res.setHeader("Cache-Control", "max-age=2592000, public")
        res.sendFile(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}`))
    }
    else res.sendStatus(404)
})

app.route("/:file").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    if (fs.existsSync(path.join(__dirname, `/build/${req.params.file}`)))
    {
        if (req.params.file === "service-worker.js" || req.params.file === "asset-manifest.json") res.setHeader("Cache-Control", "no-store, max-age=0")
        else res.setHeader("Cache-Control", "max-age=604800, public")
        res.sendFile(path.join(__dirname, `/build/${req.params.file}`))
    }
    else
    {
        res.setHeader("Cache-Control", "no-store, max-age=0")
        res.sendFile(path.join(__dirname, "/build/index.html"))
    }
})

app.route("*").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    res.setHeader("Cache-Control", "no-store, max-age=0")
    if (fs.existsSync(path.join(__dirname, "/build/index.html"))) res.sendFile(path.join(__dirname, "/build/index.html"))
    else res.sendFile(path.join(__dirname, "/updating.html"))
})

app.listen(process.env.REACT_APP_PORT, () => console.log(`Server is running in ${process.env.REACT_APP_PORT} ... `))