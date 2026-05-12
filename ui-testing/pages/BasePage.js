/**
 * BasePage - Classe base para todas as páginas
 * Contém métodos comuns reutilizáveis
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navega para uma URL
   * @param {string} path - Caminho da URL
   */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /**
   * Aguarda um seletor estar visível
   * @param {string} selector - Seletor CSS
   * @param {number} timeout - Timeout em ms
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Clica em um elemento
   * @param {string} selector - Seletor CSS
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Preenche um campo de input
   * @param {string} selector - Seletor CSS
   * @param {string} text - Texto a ser digitado
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Obtém o texto de um elemento
   * @param {string} selector - Seletor CSS
   * @returns {Promise<string>} Texto do elemento
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Valida se um elemento está visível
   * @param {string} selector - Seletor CSS
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Tira screenshot da página
   * @param {string} filename - Nome do arquivo
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: `ui-testing/evidencia/${filename}` });
  }

  /**
   * Aguarda por navegação
   */
  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  /**
   * Obtém o título da página
   * @returns {Promise<string>} Título da página
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Obtém a URL atual
   * @returns {Promise<string>} URL atual
   */
  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;
