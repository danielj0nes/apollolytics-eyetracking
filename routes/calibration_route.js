/**
 * File to define the API route handlers for the calibration component of the site.
 * @module routes/calibration_route.js
 * @author Daniel Jones
 */
import Router from 'koa-router'

const router = new Router()
/**
 * Calibration mode - used to calibrate the Webgazer after participant adds their ID
 * @name Calibration Page
 * @route {GET} /calibration
 */
router.get('/calibration', async ctx => await ctx.render('calibrate'))
router.get('/calibration2', async ctx => await ctx.render('calibrate2'))

/* Export the router (which includes the associated methods) for use in routes.js */
export default router