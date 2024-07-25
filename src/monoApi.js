import Account from './entities/account.js'
import Config from './config.js'

const IN_MEMORY = new Map()

class MonoApi {
  /**
   * @typedef {{ accounts: Account[], jars: any[], clientId: string, webHookUrl: string, name: string }} Profile
   * @returns {Promise<Profile>}
   */
  static async getProfile() {
    const cached = IN_MEMORY.get('profile')

    if (cached && Date.now() - cached.timestamp < Config.constants.profileCacheTime) {
      return cached.data
    }

    const res = await sendRequest('/personal/client-info', 'GET')
    const data = { ...res, accounts: res.accounts.map((a) => new Account(a)) }

    IN_MEMORY.set('profile', { timestamp: Date.now(), data })

    return data
  }

  static async postWebhook() {
    const res = await sendRequest('/personal/webhook', 'POST', {
      webHookUrl: Config.MONO_WEBHOOK_URL,
    })

    if (res.status !== 'ok') {
      throw new Error('Unable to start application! Webhook was not set')
    }
    return res
  }

  static async initWebhook() {
    const profile = await MonoApi.getProfile()
    if (profile.webHookUrl) {
      return
    }

    await MonoApi.postWebhook()
  }
}

async function sendRequest(path, method, data = null) {
  return fetch(`${Config.MONO_API_URL}${path}`, {
    method,
    data,
    headers: {
      'X-Token': Config.MONO_API_TOKEN,
    },
  }).then((res) => res.json())
}

export default MonoApi
