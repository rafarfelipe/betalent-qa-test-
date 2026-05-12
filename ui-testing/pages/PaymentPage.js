/**
 * PaymentPage - Página de Checkout do Sauce Demo
 * Testes relacionados ao processo de compra
 */
const BasePage = require('./BasePage');

class PaymentPage extends BasePage {
  // Seletores - Passo 1
  get firstNameInput() {
    return '[data-test="firstName"]';
  }

  get lastNameInput() {
    return '[data-test="lastName"]';
  }

  get postalCodeInput() {
    return '[data-test="postalCode"]';
  }

  get continueButton() {
    return '[data-test="continue"]';
  }

  get cancelButton() {
    return '[data-test="cancel"]';
  }

  // Seletores - Passo 2
  get finishButton() {
    return '[data-test="finish"]';
  }

  // Seletores - Confirmação
  get completeHeader() {
    return '.complete-header';
  }

  get completePage() {
    return '.checkout_complete_container';
  }

  get backHomeButton() {
    return '[data-test="back-to-products"]';
  }

  get errorMessage() {
    return '[data-test="error"]';
  }

  /**
   * Preenche informações de entrega
   * @param {Object} info - Objeto com firstName, lastName, postalCode
   */
  async fillCheckoutInfo(info) {
    await this.fill(this.firstNameInput, info.firstName);
    await this.fill(this.lastNameInput, info.lastName);
    await this.fill(this.postalCodeInput, info.postalCode);
  }

  /**
   * Clica no botão de continuar
   */
  async clickContinue() {
    await this.click(this.continueButton);
    await this.page.waitForSelector(`${this.finishButton}, ${this.errorMessage}`, { timeout: 10000 });
  }

  /**
   * Clica no botão de cancelar
   */
  async clickCancel() {
    await this.click(this.cancelButton);
  }

  /**
   * Completa o checkout
   */
  async finishCheckout() {
    await this.click(this.finishButton);
    await this.page.waitForSelector(this.completePage, { timeout: 10000 });
  }

  /**
   * Valida se checkout foi concluído com sucesso
   * @returns {Promise<boolean>}
   */
  async isCheckoutComplete() {
    return await this.isVisible(this.completePage);
  }

  /**
   * Obtém mensagem de sucesso
   * @returns {Promise<string>}
   */
  async getCompleteMessage() {
    return await this.getText(this.completeHeader);
  }

  /**
   * Volta para home após compra
   */
  async backToHome() {
    await this.click(this.backHomeButton);
  }

  /**
   * Verifica se erro está visível
   * @returns {Promise<boolean>}
   */
  async isErrorVisible() {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Obtém mensagem de erro
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    if (await this.isErrorVisible()) {
      return await this.getText(this.errorMessage);
    }
    return null;
  }

  /**
   * Valida se está na página de revisão de pedido (passo 2)
   * @returns {Promise<boolean>}
   */
  async isReviewPageLoaded() {
    return await this.isVisible(this.finishButton);
  }
}

module.exports = PaymentPage;
