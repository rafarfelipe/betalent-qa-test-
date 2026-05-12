/**
 * CatalogPage - Página de Produtos do Sauce Demo
 * Testes relacionados a listagem, ordenação e filtragem
 */
const BasePage = require('./BasePage');

class CatalogPage extends BasePage {
  // Seletores
  get productsContainer() {
    return '.inventory_container';
  }

  get productItems() {
    return '.inventory_item';
  }

  get sortDropdown() {
    return '[data-test="product-sort-container"]';
  }

  get cartButton() {
    return '.shopping_cart_link';
  }

  get menuButton() {
    return '#react-burger-menu-btn';
  }

  get logoutButton() {
    return '#logout_sidebar_link';
  }

  get cartBadge() {
    return '.shopping_cart_badge';
  }

  /**
   * Obtém quantidade de produtos visíveis
   * @returns {Promise<number>}
   */
  async getProductsCount() {
    const items = await this.page.$$eval(this.productItems, items => items.length);
    return items;
  }

  /**
   * Obtém lista de nomes de produtos
   * @returns {Promise<string[]>}
   */
  async getProductNames() {
    return await this.page.$$eval(
      '.inventory_item_name',
      items => items.map(item => item.textContent)
    );
  }

  /**
   * Obtém lista de preços de produtos
   * @returns {Promise<string[]>}
   */
  async getProductPrices() {
    return await this.page.$$eval(
      '.inventory_item_price',
      items => items.map(item => item.textContent)
    );
  }

  /**
   * Adiciona produto ao carrinho por índice
   * @param {number} index - Índice do produto
   */
  async addProductToCart(index) {
    const addButtons = await this.page.$$('button:has-text("Add to cart")');
    if (addButtons[index]) {
      await addButtons[index].click();
    }
  }

  /**
   * Remove produto do carrinho por índice
   * @param {number} index - Índice do produto
   */
  async removeProductFromCart(index) {
    const removeButtons = await this.page.$$('button:has-text("Remove")');
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  /**
   * Ordena produtos
   * @param {string} sortOption - Opção de ordenação (az, za, lohi, hilo)
   */
  async sortProducts(sortOption) {
    await this.click(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, sortOption);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clica em um produto para abrir detalhes
   * @param {number} index - Índice do produto
   */
  async clickProduct(index) {
    const products = await this.page.$$('.inventory_item_name');
    if (products[index]) {
      await products[index].click();
    }
  }

  /**
   * Acessa o carrinho
   */
  async goToCart() {
    await this.click(this.cartButton);
  }

  /**
   * Volta do carrinho para a página de produtos
   */
  async continueShopping() {
    await this.click('[data-test="continue-shopping"]');
    await this.page.waitForSelector(this.productsContainer, { timeout: 10000 });
  }

  /**
   * Faz logout
   */
  async logout() {
    await this.click(this.menuButton);
    await this.click(this.logoutButton);
    await this.page.waitForSelector('#login-button', { timeout: 10000 });
  }

  /**
   * Obtém quantidade de itens no carrinho
   * @returns {Promise<number>}
   */
  async getCartCount() {
    const badge = await this.page.$(this.cartBadge);
    if (!badge) return 0;
    const text = await this.getText(this.cartBadge);
    return parseInt(text);
  }

  /**
   * Verifica se página de produtos está carregada
   * @returns {Promise<boolean>}
   */
  async isProductsPageLoaded() {
    return await this.isVisible(this.productsContainer);
  }
}

module.exports = CatalogPage;
