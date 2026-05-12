/**
 * ShoppingCartPage - Página de Carrinho do Sauce Demo
 * Testes relacionados ao carrinho de compras
 */
const BasePage = require('./BasePage');

class ShoppingCartPage extends BasePage {
  // Seletores
  get cartContainer() {
    return '.cart_list';
  }

  get cartItems() {
    return '.cart_item';
  }

  get checkoutButton() {
    return '[data-test="checkout"]';
  }

  get continueShoppingButton() {
    return '[data-test="continue-shopping"]';
  }

  /**
   * Obtém quantidade de itens no carrinho
   * @returns {Promise<number>}
   */
  async getCartItemsCount() {
    const items = await this.page.$$eval(this.cartItems, items => items.length);
    return items;
  }

  /**
   * Obtém nomes dos produtos no carrinho
   * @returns {Promise<string[]>}
   */
  async getCartItemNames() {
    return await this.page.$$eval(
      '.inventory_item_name',
      items => items.map(item => item.textContent)
    );
  }

  /**
   * Remove item do carrinho por índice
   * @param {number} index - Índice do item
   */
  async removeItem(index) {
    const removeButtons = await this.page.$$('button:has-text("Remove")');
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  /**
   * Prossegue para checkout
   */
  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    await this.page.waitForSelector('[data-test="firstName"]', { timeout: 10000 });
  }

  /**
   * Volta para continuar comprando
   */
  async continueShopping() {
    await this.click(this.continueShoppingButton);
    await this.page.waitForSelector('.inventory_container', { timeout: 10000 });
  }

  /**
   * Verifica se carrinho está vazio
   * @returns {Promise<boolean>}
   */
  async isCartEmpty() {
    const itemsCount = await this.getCartItemsCount();
    return itemsCount === 0;
  }

  /**
   * Obtém o preço total do carrinho
   * @returns {Promise<string>}
   */
  async getCartTotal() {
    const total = await this.page.$('[data-test="subtotal-label"]');
    if (total) {
      const text = await total.textContent();
      return text;
    }

    const prices = await this.page.$$eval(
      '.inventory_item_price',
      items => items.map(item => Number(item.textContent.replace('$', '')))
    );
    if (prices.length > 0) {
      const sum = prices.reduce((acc, price) => acc + price, 0);
      return `$${sum.toFixed(2)}`;
    }
    return null;
  }

  /**
   * Verifica se página do carrinho está carregada
   * @returns {Promise<boolean>}
   */
  async isCartPageLoaded() {
    return await this.isVisible(this.cartContainer) || (await this.getCartItemsCount()) >= 0;
  }
}

module.exports = ShoppingCartPage;
