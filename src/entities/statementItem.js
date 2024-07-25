/**
* @class entity.StatementItem
*/
export default class StatementItem {
  constructor(src) {
    this.#statementItem = src.statementItem
    this.#account = src.account
  }

  get opAmount() {
    return this.#statementItem.operationAmount
  }

  get balanceAfterOp() {
    return this.#statementItem.balance
  }

  get opDesc() {
    return this.#statementItem.description
  }

  isFromAccount(account) {
    return account === this.#account
  }

  toJson() {
    return this.#statementItem
  }

  /**
  * @typedef {{
  *       "id": string,
  *       "time": number,
  *       "description": string,
  *       "mcc": number,
  *       "originalMcc": number,
  *       "amount": number,
  *       "operationAmount": number,
  *       "currencyCode": number,
  *       "commissionRate": number,
  *       "cashbackAmount": number,
  *       "balance": number,
  *       "hold": boolean
  * }} StatementItemType
  * @type {StatementItemType}
  */
  #statementItem
  /** @type {string} */
  #account
}
