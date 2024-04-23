import { Router } from "express";
import { logger } from "../utils/logger_produccion.js";

const route = Router()

route.get('/loggerTest', (req, res) => {

        logger.fatal('logger tipo fatal')
        logger.error('logger tipo error')
        logger.warn('logger tipo warn')
        logger.info('logger tipo info')
        logger.http('logger tipo http')
        logger.debug('logger tipo debug')
})


export default route

        