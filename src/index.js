import express from "express"
import routes from "./routes.js"

const App = express()

App.use(express.json())
App.use(routes)


App.listen(8080)