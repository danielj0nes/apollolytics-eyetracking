/**
 * File to define the API route handlers for the experiment component of the site.
 * @module routes/experiment_route.js
 * @author Daniel Jones
 */
import Router from 'koa-router'
import Accounts from '../modules/accounts.js'

const router = new Router()

router.get('/experiment_break', async ctx => {
	console.log(ctx.session)
	await ctx.render('rt1.5_experiment_break')
})

router.get('/experiment/:number/:type', async ctx => {
	const experimentNo = ctx.params.number
	const experimentType = ctx.params.type
	try {
		switch (experimentNo) {
			case '1':
				switch (experimentType) {
					case 'raw':
						await ctx.render('rt1_experiment_raw')
						break
					case 'tool':
						await ctx.render('rt1_experiment_tool')
						break
					case 'break':
						await ctx.render('rt1_experiment_break')
						break
					default:
						break
				}
				break
			case '2':
				switch (experimentType) {
					case 'raw':
						await ctx.render('rt2_experiment_raw')
						break
					case 'tool':
						await ctx.render('rt2_experiment_tool')
						break
					case 'break':
						await ctx.render('rt2_experiment_break')
						break
					default:
						break
				}
				break
			default:
				break
		}
	} catch(err) {
		console.log(err)
		console.log(ctx.hbs)
		await ctx.render('mainmenu', ctx.hbs)
	}
})

router.post('/experiment/width_height', async ctx => {
	const account = new Accounts()
	await account.init()
	try {
		const participantId = ctx.session.participantId
		const width = ctx.request.body.width
		const height = ctx.request.body.height
		await account.update('width', width, participantId)
		await account.update('height', height, participantId)
	} catch(err) {
		console.log(err)
		console.log(ctx.hbs)
		await ctx.render('mainmenu', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.post('/experiment/:number/:type', async ctx => {
	const account = new Accounts()
	await account.init()
	const experimentNo = ctx.params.number
	const experimentType = ctx.params.type
	try {
		const participantId = ctx.session.participantId
		const gazeData = ctx.request.body
		switch (experimentNo) {
			case '1':
				switch (experimentType) {
					case 'raw':
						await account.update('rt1_gazedata', JSON.stringify(gazeData), participantId)
						break
					case 'tool':
						await account.update('rt1_gazedata_tool', JSON.stringify(gazeData), participantId)
						break
					default:
						break
				}
				break
			case '2':
				switch (experimentType) {
					case 'raw':
						await account.update('rt2_gazedata', JSON.stringify(gazeData), participantId)
						break
					case 'tool':
						await account.update('rt2_gazedata_tool', JSON.stringify(gazeData), participantId)
						break
					default:
						break
				}
				break
			default:
				break
		}
	} catch(err) {
		console.log(err)
		console.log(ctx.hbs)
		await ctx.render('mainmenu', ctx.hbs)
	} finally {
		await account.close()
	}
})

/* Export the router (which includes the associated methods) for use in routes.js */
export default router