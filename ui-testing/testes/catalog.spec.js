/**
 * TESTES DE CATÁLOGO - Sauce Demo
 * Estilo BDD
 *
 * Funcionalidade: Gerenciamento de Produtos
 *   Como um comprador
 *   Eu quero visualizar, ordenar e filtrar produtos
 *   Para que eu possa encontrar produtos facilmente
 */

const { test, expect } = require('@playwright/test')
const SignInPage = require('../pages/SignInPage')
const CatalogPage = require('../pages/CatalogPage')

test.describe('Catalogo de Produtos', () => {
  let signInPage
  let catalogPage

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    catalogPage = new CatalogPage(page)

    // Login antes de cada teste
    await signInPage.goto()
    await signInPage.login('standard_user', 'secret_sauce')
  })

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-CATALOG-001 | Deve exibir todos os produtos', async ({ page }) => {
    // Cenário: Visualizar lista de produtos
    // Dado que estou logado
    // Então devo ver produtos na página
    expect(await catalogPage.isProductsPageLoaded()).toBeTruthy()

    // E deve haver pelo menos 6 produtos
    const count = await catalogPage.getProductsCount()
    expect(count).toBeGreaterThanOrEqual(6)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-001-all-products.png')
  })

  test('TC-CATALOG-002 | Deve ordenar produtos A-Z', async ({ page }) => {
    // Cenário: Ordenar produtos alfabeticamente crescente
    // Dado que estou na página de produtos
    // Quando seleciono a opção "Name (A to Z)"
    await catalogPage.sortProducts('az')

    // Então os produtos devem estar ordenados A-Z
    const names = await catalogPage.getProductNames()
    const sorted = [...names].sort()
    expect(names).toEqual(sorted)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-002-sort-az.png')
  })

  test('TC-CATALOG-003 | Deve ordenar produtos Z-A', async ({ page }) => {
    // Cenário: Ordenar produtos alfabeticamente decrescente
    // Dado que estou na página de produtos
    // Quando seleciono a opção "Name (Z to A)"
    await catalogPage.sortProducts('za')

    // Então os produtos devem estar ordenados Z-A
    const names = await catalogPage.getProductNames()
    const sorted = [...names].sort().reverse()
    expect(names).toEqual(sorted)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-003-sort-za.png')
  })

  test('TC-CATALOG-004 | Deve ordenar produtos por preço menor para maior', async ({ page }) => {
    // Cenário: Ordenar produtos por preço crescente
    // Quando seleciono a opção "Price (low to high)"
    await catalogPage.sortProducts('lohi')

    // Então os produtos devem estar ordenados por preço crescente
    const prices = await catalogPage.getProductPrices()
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')))
    const sorted = [...priceValues].sort((a, b) => a - b)
    expect(priceValues).toEqual(sorted)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-004-sort-lohi.png')
  })

  test('TC-CATALOG-005 | Deve ordenar produtos por preço maior para menor', async ({ page }) => {
    // Cenário: Ordenar produtos por preço decrescente
    // Quando seleciono a opção "Price (high to low)"
    await catalogPage.sortProducts('hilo')

    // Então os produtos devem estar ordenados por preço decrescente
    const prices = await catalogPage.getProductPrices()
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')))
    const sorted = [...priceValues].sort((a, b) => b - a)
    expect(priceValues).toEqual(sorted)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-005-sort-hilo.png')
  })

  test('TC-CATALOG-006 | Deve adicionar produto ao carrinho', async ({ page }) => {
    // Cenário: Adicionar produto único ao carrinho
    // Dado que estou na página de produtos
    // Quando clico no botão "Add to cart" no primeiro produto
    await catalogPage.addProductToCart(0)

    // Então o carrinho deve mostrar 1 item
    const count = await catalogPage.getCartCount()
    expect(count).toBe(1)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-006-add-to-cart.png')
  })

  test('TC-CATALOG-007 | Deve remover produto do carrinho', async ({ page }) => {
    // Cenário: Remover produto do carrinho
    // Dado que adicionei um produto ao carrinho
    await catalogPage.addProductToCart(0)
    expect(await catalogPage.getCartCount()).toBe(1)

    // Quando clico no botão "Remove"
    await catalogPage.removeProductFromCart(0)

    // Então o carrinho deve estar vazio
    const count = await catalogPage.getCartCount()
    expect(count).toBe(0)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-007-remove-from-cart.png')
  })

  test('TC-CATALOG-008 | Deve navegar para o carrinho', async ({ page }) => {
    // Cenário: Navegar para o carrinho de compras
    // Dado que adicionei um produto ao carrinho
    await catalogPage.addProductToCart(0)

    // Quando clico no botão do carrinho
    await catalogPage.goToCart()

    // Então devo estar na página do carrinho
    expect(page.url()).toContain('cart')

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-008-navigate-cart.png')
  })

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-CATALOG-009 | Deve exibir preços corretos dos produtos', async ({ page }) => {
    // Cenário: Verificar que preços dos produtos são exibidos corretamente
    // Dado que estou na página de produtos
    // Quando obtenho todos os preços dos produtos
    const prices = await catalogPage.getProductPrices()

    // Então todos os preços devem ter sinal de dólar
    prices.forEach(price => {
      expect(price).toMatch(/^\$/)
    })

    // E todos os preços devem ser números válidos
    prices.forEach(price => {
      const numValue = parseFloat(price.replace('$', ''))
      expect(numValue).toBeGreaterThan(0)
    })

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-009-verify-prices.png')
  })

  test('TC-CATALOG-010 | Deve adicionar múltiplos produtos ao carrinho', async ({ page }) => {
    // Cenário: Adicionar múltiplos produtos
    // Dado que estou na página de produtos
    // Quando adiciono 3 produtos ao carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.addProductToCart(1)
    await catalogPage.addProductToCart(2)

    // Então o carrinho deve mostrar 3 itens
    const count = await catalogPage.getCartCount()
    expect(count).toBe(3)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-010-multiple-items.png')
  })

  test('TC-CATALOG-011 | Deve ser responsivo em mobile', async ({ page }) => {
    // Cenário: Página de produtos deve ser responsiva
    // Dado que defino viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })

    // Quando a página de produtos é exibida
    // Então os produtos devem ser visíveis
    expect(await catalogPage.isProductsPageLoaded()).toBeTruthy()

    // E a lista de produtos deve ser rolável
    const count = await catalogPage.getProductsCount()
    expect(count).toBeGreaterThan(0)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-011-mobile-responsive.png')
  })

  test('TC-CATALOG-012 | Deve exibir imagens dos produtos', async ({ page }) => {
    // Cenário: Imagens dos produtos devem carregar
    // Dado que estou na página de produtos
    // Quando procuro imagens dos produtos
    const images = await page.$$('.inventory_item_img')

    // Então as imagens devem estar presentes
    expect(images.length).toBeGreaterThan(0)

    // Tiro screenshot
    await catalogPage.takeScreenshot('catalog-012-product-images.png')
  })
})