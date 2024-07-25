import dotenv from 'dotenv'
dotenv.config()

export default class Config {
  static get MONO_API_TOKEN() {
    return process.env.MONO_API_TOKEN
  }
  static get MONO_API_URL() {
    return process.env.MONO_API_URL
  }
  static get MONO_WEBHOOK_URL() {
    return `${process.env.MONO_WEBHOOK_URL}?api=${process.env.MONO_WEBHOOK_API_KEY}`
  }
  static get MONO_WEBHOOK_API_KEY() {
    return process.env.MONO_WEBHOOK_API_KEY
  }
  static get MONO_TRACKING_ACCOUNTS() {
    return process.env.MONO_TRACKING_ACCOUNTS?.split(',')
  }

  static get TELEGRAM_API_URL() {
    return process.env.TELEGRAM_API_URL
  }
  static get TELEGRAM_API_TOKEN() {
    return process.env.TELEGRAM_API_TOKEN
  }
  static get TELEGRAM_CHAT_ID() {
    return process.env.TELEGRAM_CHAT_ID
  }

  static constants = {
    profileCacheTime: 3600 * 1000, // 1 Hour
    serverPort: Number(process.env.PORT) || 9876
  }
}
