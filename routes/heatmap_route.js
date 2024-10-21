/**
 * File to define the API route handlers for the heatmap component of the site.
 * @module routes/heatmap_route.js
 * @author Daniel Jones
 */
import Router from 'koa-router'
import Accounts from '../modules/accounts.js'

const router = new Router()

router.get('/heatmap/:number/:type/:participantid', async ctx => {
	const experimentNo = ctx.params.number
	const participantId = ctx.params.participantid
	const experimentType = ctx.params.type
	const account = new Accounts()
	let gazeData
	await account.init()
	try {
		const participant = await account.get('user', participantId)
		const width = await account.get('width', participantId)
		const height = await account.get('height', participantId)
		ctx.hbs.participant = participant.user
		ctx.hbs.width = width.width
		ctx.hbs.height = height.height
		switch (experimentNo) {
			case '1':
				switch (experimentType) {
					case 'raw':
						gazeData = await account.get('rt1_gazedata', participantId)
						ctx.hbs.gazedata = gazeData.rt1_gazedata
						await ctx.render('rt1_heatmap_overlay_raw', ctx.hbs)
						break
					case 'tool':
						gazeData = await account.get('rt1_gazedata_tool', participantId)
						ctx.hbs.gazedata = gazeData.rt1_gazedata_tool
						await ctx.render('rt1_heatmap_overlay_tool', ctx.hbs)
						break
					default:
						break
				}
				break
			case '2':
				switch (experimentType) {
					case 'raw':
						gazeData = await account.get('rt2_gazedata', participantId)
						ctx.hbs.gazedata = gazeData.rt2_gazedata
						await ctx.render('rt2_heatmap_overlay_raw', ctx.hbs)
						break
					case 'tool':
						gazeData = await account.get('rt2_gazedata_tool', participantId)
						ctx.hbs.gazedata = gazeData.rt2_gazedata_tool
						await ctx.render('rt2_heatmap_overlay_tool', ctx.hbs)
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

/* Export the router (which includes the associated methods) for use in routes.js */
export default router