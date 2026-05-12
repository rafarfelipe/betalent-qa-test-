/**
 * SignInPage - Página de Login do Sauce Demo
 * Testes relacionados à autenticação
 */
const BasePage = require('./BasePage');

class SignInPage extends BasePage {
  // Seletores
  get usernameInput() {
    return '#user-name';
  }

  get passwordInput() {
    return '#password';
  }

  get loginButton() {
    return '#login-button';
  }

  get errorMessage() {
    return '[data-test="error"]';
  }

  /**
   * Realiza login com credenciais
   * @param {string} username - Usuário
   * @param {string} password - Senha
   */
  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    // Aguarda carregar página de produtos
    await this.page.waitForSelector('.inventory_container', { timeout: 10000 });
  }

  /**
   * Verifica se página de login está carregada
   * @returns {Promise<boolean>}
   */
  async isLoginPageLoaded() {
    return await this.isVisible(this.loginButton);
  }

  /**
   * Obtém mensagem de erro
   * @returns {Promise<string>} Mensagem de erro
   */
  async getErrorMessage() {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return null;
  }

  /**
   * Verifica se erro está visível
   * @returns {Promise<boolean>}
   */
  async isErrorVisible() {
    return await this.isVisible(this.errorMessage);
  }
}

module.exports = SignInPage;
