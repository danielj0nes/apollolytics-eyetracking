/**
 * File to define the API route handlers for the main menu of the site.
 * @module routes/menu_route.js
 * @author Daniel Jones
 */
import Router from 'koa-router'
import Accounts from '../modules/accounts.js'

const router = new Router()
/**
 * Simple registration process for visitors to the experiment.
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	// to do: show participantid on main page once setup
	console.log(ctx.session)
	return ctx.redirect('/register')
})

/**
 * Experiment registration - used to obtain participant ID
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('mainmenu'))

// Handle different flow of experiment
router.get('/register2', async ctx => await ctx.render('mainmenu2'))

/**
 * Add new user + timestamp to database
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = new Accounts()
	await account.init()
	try {
		const participantname = ctx.request.body.participantname
		let timestamp = new Date()
		timestamp = timestamp.toLocaleString('en-GB')
		console.log(JSON.stringify(ctx.hbs))
		const participantId = await account.register(participantname, timestamp)
		console.log(`New participant "${participantname}" + "${timestamp}" + "${participantId}" registered`)
		ctx.session.participantname = participantname
		ctx.session.participantId = participantId
		return ctx.redirect('/calibration')
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('mainmenu', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.post('/register2', async ctx => {
	const account = new Accounts()
	await account.init()
	try {
		const participantname = ctx.request.body.participantname
		let timestamp = new Date()
		timestamp = timestamp.toLocaleString('en-GB')
		console.log(JSON.stringify(ctx.hbs))
		const participantId = await account.register(participantname, timestamp)
		console.log(`New participant "${participantname}" + "${timestamp}" + "${participantId}" registered`)
		ctx.session.participantname = participantname
		ctx.session.participantId = participantId
		return ctx.redirect('/calibration2')
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('mainmenu2', ctx.hbs)
	} finally {
		await account.close()
	}
})

/* Export the router (which includes the associated methods) for use in routes.js */
export default router