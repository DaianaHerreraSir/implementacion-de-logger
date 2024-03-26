import { Router } from "express";

export const pruebasRouter = Router(
)

pruebasRouter.get("/logger", (req, res)=>{
    // req.logger.error("error ejecutandose");
    // req.logger.warning("warning ejecutandose");
    req.logger.info("información ejecutándose"); 
    res.send("logger ejecutado")
})