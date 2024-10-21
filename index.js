import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import sslify from 'koa-sslify'
import fs from 'fs'
import https from 'https'
import session from 'koa-session'

import router from './routes/routes.js'

const app = new Koa()

app.keys = ['xyz']
app.use(session(app))

const defaultPort = 443
const port = process.env.PORT || defaultPort

async function getHandlebarData(ctx, next) {
	console.log(`${ctx.method} ${ctx.path}`)
	ctx.hbs = {
		host: `https://${ctx.host}`
	}
	for(const key in ctx.query) ctx.hbs[key] = ctx.query[key]
	await next()
}

app.use(sslify.default())
app.use(serve('public'))
app.use(views('views', { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

app.use(getHandlebarData)

app.use(router.routes())
app.use(router.allowedMethods())

// Self-sign SSL
const options = {
    key: fs.readFileSync('/etc/letsencrypt/archive/vanderschoot.net/privkey1.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/vanderschoot.net/cert1.pem'),
  };

const server = https.createServer(options, app.callback())
server.listen(port, async() => console.log(`listening on port ${port}`))