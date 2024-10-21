/**
 * File to obtain and connect the various routers from the different route files
 * @module routes/routes.js
 * @author Daniel Jones
 */
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import menuRouter from './menu_route.js'
import calibrationRouter from './calibration_route.js'
import experimentRouter from './experiment_route.js'
import heatmapRouter from './heatmap_route.js'

const mainRouter = new Router()
mainRouter.use(bodyParser())


const nestedRoutes = [menuRouter, calibrationRouter, experimentRouter, heatmapRouter]
for (const router of nestedRoutes) {
	mainRouter.use(router.routes())
	mainRouter.use(router.allowedMethods())
}
/* Export the mainRouter (which includes the associated methods) for use in index.js */
export default mainRouter