import fastify from 'fastify'
import MonoApi from './monoApi.js'
import TelegramApi from './telegramApi.js'
import StatementItem from './entities/statementItem.js'
import Config from './config.js'

const app = fastify()
const TRACKING_ACCOUNTS = new Set(Config.MONO_TRACKING_ACCOUNTS)

export async function initApp() {
  app.get('/webhook', async (req, res) => {
    console.log('Got ping')
    return res.status(200).send('ok')
  })

  app.post('/webhook', async (req, res) => {
    if (req.query.api !== Config.MONO_WEBHOOK_API_KEY) {
      console.error('responded 401', req.query.api)
      return res.status(401).send('Unauthorized')
    }

    const statementItem = new StatementItem(req.body.data)
    await handleWebHook(statementItem)

    console.log('Responded 200')
    return res.status(200).send('ok')
  })

  app.listen(
    {
      port: Config.constants.serverPort,
      host: '0.0.0.0',
    },
    async (err) => {
      if (err) {
        console.error(err)
        return
      }

      await MonoApi.initWebhook()
      await TelegramApi.sendPing()
      console.log(`Listening on port ${Config.constants.serverPort}`)
    },
  )
}

initApp()

/** @param {StatementItem} statement */
async function handleWebHook(statement) {
  const profile = await MonoApi.getProfile()
  const relatedAccount = profile.accounts.find((a) =>
    statement.isFromAccount(a.id),
  )

  if (!relatedAccount || !TRACKING_ACCOUNTS.has(relatedAccount.id)) {
    return null
  }

  const res = await TelegramApi.sendStatementNotification({
    statement,
    relatedAccount,
  })

  if (!res.ok) {
    console.log(res)
  }
}
