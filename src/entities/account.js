/**
* @class entity.Account
*/
export default class Account {
  constructor(src) {
    this.#accountInfo = src
  }

  get id() {
    return this.#accountInfo.id
  }

  get balance() {
    return this.#accountInfo.balance
  }

  get balanceWithoutCredit() {
    return this.#accountInfo - this.#accountInfo.creditLimit
  }

  get creditLimit() {
    return this.#accountInfo.creditLimit
  }

  get numberMask() {
    return this.#accountInfo.maskedPan[0]
  }

  get type() {
    return this.#accountInfo.type
  }

  toJson() {
    return this.#accountInfo
  }

  /**
   * @typedef {'fop' | 'eAid' | 'black' | 'white'} AccountType
   * @typedef {{
   *  id: string
   *  sendId: string
   *  currencyCode: number
   *  cashbackType: string
   *  balance: number
   *  creditLimit: number
   *  maskedPan: string[]
   *  type: AccountType
   *  iban: string
   * }} AccountInfo
   *  @type {AccountInfo}
   */
  #accountInfo
}
