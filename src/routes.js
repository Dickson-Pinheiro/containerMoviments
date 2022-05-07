import express from "express"
import containerController from "./controllers/containerController.js"
import movimentsController from "./controllers/movimentsController.js"

const routes = express.Router()

routes.get("/containers", containerController.index)
routes.get("/containers/:id", containerController.indexOne)
routes.post("/containers", containerController.create)
routes.put("/containers", containerController.update)
routes.delete("/containers/:id", containerController.delete)

routes.get("/moviments", movimentsController.index)
routes.get("/moviments/:id", movimentsController.indexOne)
routes.post("/moviments", movimentsController.create)
routes.put("/moviments", movimentsController.update)
routes.delete("/moviments", movimentsController.delete)

export default routes;