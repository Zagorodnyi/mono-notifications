import Config from './config.js'
import { intToFloat } from './helpers.js'

class MessageBuilder {
  /**
   * @param {import('./entities/statementItem').default} statement
   * @param {import('./entities/account').default} relatedAccount
   */
  static buildStatementMessage(statement, relatedAccount) {
    const balance = intToFloat(statement.balanceAfterOp - relatedAccount.creditLimit)
    return `
💳 Операція за карткою <b>${relatedAccount.numberMask}</b>

🤑 Сумма: <b>${intToFloat(statement.opAmount)}грн</b>
📝 Опис: <b>${statement.opDesc}</b>


💰 Залишок: <b>${balance}грн</b>
`
  }
}

export default class TelegramApi {
  static sendStatementNotification(message) {
    const notification = {
      ...message,
      type: "STATEMENT",
    };

    return this.sendMessage(notification);
  }

  static async sendPing() {
    const url = this.buildUrl("I'm started");

    try {
      const res = await fetch(url, { method: "POST" });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }

   static async sendMessage(message) {
    const FormattedMessage = this.buildMessage(message);
    const url = this.buildUrl(FormattedMessage);

    try {
      const res = await fetch(url, { method: "POST" });
      return res.json();
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
    }
  }

  static buildMessage(message) {
    switch (message.type) {
      case "STATEMENT":
        return MessageBuilder.buildStatementMessage(message.statement, message.relatedAccount);
      default:
        throw new Error(`Unknown message type ${message?.type}`);
    }
  }

  static buildUrl(message) {
    const url = Config.TELEGRAM_API_URL;
    const apiToken = encodeURIComponent(Config.TELEGRAM_API_TOKEN);
    const chatId = encodeURIComponent(Config.TELEGRAM_CHAT_ID);
    const encodedMessage = encodeURIComponent(message);

    return `${url}${apiToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${encodedMessage}`;
  }
}
