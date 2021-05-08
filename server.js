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
    if (fs.existsSync(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}.gz`)))
    {
        if (req.params.file.includes(".js")) res.setHeader("Content-Type", "application/javascript")
        else if (req.params.file.includes(".css")) res.setHeader("Content-Type", "text/css")
        res.setHeader("Vary", "Accept-Encoding")
        res.setHeader("Cache-Control", "max-age=31536000")

        res.setHeader("Content-Encoding", "gzip")
        res.sendFile(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}.gz`))
    }
    else if (fs.existsSync(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}`)))
    {
        if (req.params.file.includes(".js")) res.setHeader("Content-Type", "application/javascript")
        else if (req.params.file.includes(".css")) res.setHeader("Content-Type", "text/css")
        res.setHeader("Vary", "Accept-Encoding")
        res.setHeader("Cache-Control", "max-age=31536000")

        res.sendFile(path.join(__dirname, `/build/static/${req.params.folder}/${req.params.file}`))
    }
    else res.sendStatus(404)
})

app.route("/.well-known/assetlinks.json").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    res.setHeader("Cache-Control", "max-age=31536000")
    res.sendFile(path.join(__dirname, "/build/assetlinks.json"))
})

app.route("/service-worker.js").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    res.setHeader("Cache-Control", "no-store, max-age=0")
    res.sendFile(path.join(__dirname, "/build/service-worker.js"))
})

app.route("/asset-manifest.json").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    res.setHeader("Cache-Control", "no-store, max-age=0")
    res.sendFile(path.join(__dirname, "/build/asset-manifest.json"))
})

app.route("/:file").get((req, res) =>
{
    if (fs.existsSync(path.join(__dirname, `/build/${req.params.file}`)))
    {
        res.setHeader("Vary", "Accept-Encoding")
        res.setHeader("Cache-Control", "max-age=604800")
        res.sendFile(path.join(__dirname, `/build/${req.params.file}`))
    }
    else
    {
        res.setHeader("Vary", "Accept-Encoding")
        res.setHeader("Cache-Control", "no-store, max-age=0")
        res.sendFile(path.join(__dirname, "/build/index.html"))
    }
})

app.route("*").get((req, res) =>
{
    res.setHeader("Vary", "Accept-Encoding")
    res.setHeader("Cache-Control", "no-store, max-age=0")
    res.sendFile(path.join(__dirname, "/build/index.html"))
})

app.listen(process.env.REACT_APP_PORT, () => console.log(`Server is running in ${process.env.REACT_APP_PORT} ... `))
