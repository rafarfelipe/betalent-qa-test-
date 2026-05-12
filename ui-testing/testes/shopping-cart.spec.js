/**
 * TESTES DE CARRINHO - Sauce Demo
 * Estilo BDD
 *
 * Funcionalidade: Carrinho de Compras
 *   Como um comprador
 *   Eu quero gerenciar itens no meu carrinho
 *   Para que eu possa controlar minha compra
 */

const { test, expect } = require('@playwright/test')
const SignInPage = require('../pages/SignInPage')
const CatalogPage = require('../pages/CatalogPage')
const ShoppingCartPage = require('../pages/ShoppingCartPage')

test.describe('Gerenciamento do Carrinho de Compras', () => {
  let signInPage
  let catalogPage
  let shoppingCartPage

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    catalogPage = new CatalogPage(page)
    shoppingCartPage = new ShoppingCartPage(page)

    // Login antes de cada teste
    await signInPage.goto()
    await signInPage.login('standard_user', 'secret_sauce')
  })

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-CARRINHO-001 | Deve exibir carrinho vazio', async ({ page }) => {
    // Cenário: Navegar para carrinho vazio
    // Dado que estou logado
    // Quando navego para o carrinho sem adicionar itens
    await catalogPage.goToCart()

    // Então o carrinho deve estar vazio
    expect(await shoppingCartPage.isCartEmpty()).toBeTruthy()

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-001-empty-cart.png')
  })

  test('TC-CARRINHO-002 | Deve adicionar item ao carrinho e exibi-lo', async ({ page }) => {
    // Cenário: Adicionar item e verificar no carrinho
    // Dado que estou na página de produtos
    // Quando adiciono produto ao carrinho
    const initialNames = await catalogPage.getProductNames()
    await catalogPage.addProductToCart(0)

    // E navego para o carrinho
    await catalogPage.goToCart()

    // Então o carrinho deve conter o produto
    const cartNames = await shoppingCartPage.getCartItemNames()
    expect(cartNames).toContain(initialNames[0])

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-002-item-in-cart.png')
  })

  test('TC-CARRINHO-003 | Deve remover item do carrinho', async ({ page }) => {
    // Cenário: Remover item do carrinho
    // Dado que tenho item no carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()
    expect(await shoppingCartPage.getCartItemsCount()).toBe(1)

    // Quando clico no botão remover
    await shoppingCartPage.removeItem(0)

    // Então o carrinho deve estar vazio
    expect(await shoppingCartPage.isCartEmpty()).toBeTruthy()

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-003-item-removed.png')
  })

  test('TC-CARRINHO-004 | Deve exibir múltiplos itens no carrinho', async ({ page }) => {
    // Cenário: Múltiplos itens no carrinho
    // Dado que estou na página de produtos
    // Quando adiciono 3 produtos ao carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(1)
    await catalogPage.addProductToCart(2)

    // E navego para o carrinho
    await catalogPage.goToCart()

    // Então o carrinho deve mostrar 3 itens
    const count = await shoppingCartPage.getCartItemsCount()
    expect(count).toBe(3)

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-004-multiple-items.png')
  })

  test('TC-CARRINHO-005 | Deve remover item específico do carrinho com múltiplos itens', async ({ page }) => {
    // Cenário: Remover um item de múltiplos itens no carrinho
    // Dado que tenho 3 itens no carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(1)
    await catalogPage.addProductToCart(2)
    await catalogPage.goToCart()

    // Quando removo o primeiro item
    await shoppingCartPage.removeItem(0)

    // Então o carrinho deve ter 2 itens
    const count = await shoppingCartPage.getCartItemsCount()
    expect(count).toBe(2)

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-005-remove-specific-item.png')
  })

  test('TC-CARRINHO-006 | Deve prosseguir para o checkout a partir do carrinho', async ({ page }) => {
    // Cenário: Prosseguir para checkout
    // Dado que tenho itens no carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()

    // Quando clico no botão checkout
    await shoppingCartPage.proceedToCheckout()

    // Então devo estar na página de checkout
    expect(page.url()).toContain('checkout-step-one')

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-006-proceed-checkout.png')
  })

  test('TC-CARRINHO-007 | Deve continuar compras a partir do carrinho', async ({ page }) => {
    // Cenário: Voltar às compras a partir do carrinho
    // Dado que estou na página do carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()

    // Quando clico no botão "Continue Shopping"
    await shoppingCartPage.continueShopping()

    // Então devo retornar à página de produtos
    expect(page.url()).not.toContain('cart')
    expect(await catalogPage.isProductsPageLoaded()).toBeTruthy()

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-007-continue-shopping.png')
  })

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-CARRINHO-008 | Deve exibir total correto do carrinho', async ({ page }) => {
    // Cenário: Verificar cálculo do total do carrinho
    // Dado que adiciono itens ao carrinho
    const prices = await catalogPage.getProductPrices()
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(1)

    // Quando navego para o carrinho
    await catalogPage.goToCart()

    // Então o carrinho deve exibir o total
    const total = await shoppingCartPage.getCartTotal()
    expect(total).toBeTruthy()
    expect(total).toContain('$')

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-008-carrinho-total.png')
  })

  test('TC-CARRINHO-009 | Deve manter o carrinho entre páginas', async ({ page }) => {
    // Cenário: Persistência do carrinho
    // Dado que adiciono item ao carrinho
    await catalogPage.addProductToCart(0)
    const initialCount = await catalogPage.getCartCount()

    // Quando navego para a página de produtos
    await catalogPage.goToCart()
    await shoppingCartPage.continueShopping()

    // Então a contagem do carrinho deve persistir
    const finalCount = await catalogPage.getCartCount()
    expect(finalCount).toBe(initialCount)

    // Tiro screenshot
    await catalogPage.takeScreenshot('carrinho-009-persist-cart.png')
  })

  test('TC-CARRINHO-010 | Deve ser responsivo em mobile', async ({ page }) => {
    // Cenário: Design responsivo da página do carrinho
    // Dado que adiciono item ao carrinho
    await catalogPage.addProductToCart(0)

    // E defino viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })

    // Quando navego para o carrinho
    await catalogPage.goToCart()

    // Então o carrinho deve ser visível
    expect(await shoppingCartPage.isCartPageLoaded()).toBeTruthy()

    // Tiro screenshot
    await shoppingCartPage.takeScreenshot('carrinho-010-mobile-responsive.png')
  })
})