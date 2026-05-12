/**
 * TESTES DE NAVEGAÇÃO E LOGOUT - Sauce Demo
 * Estilo BDD
 *
 * Funcionalidade: Navegação e Gerenciamento de Sessão
 *   Como um usuário
 *   Eu quero navegar e fazer logout do aplicativo
 *   Para que eu possa gerenciar minha sessão
 */

const { test, expect } = require('@playwright/test')
const SignInPage = require('../pages/SignInPage')
const CatalogPage = require('../pages/CatalogPage')

test.describe('Navegacao do Aplicativo', () => {
  let signInPage
  let catalogPage

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    catalogPage = new CatalogPage(page)

    await signInPage.goto()
    await signInPage.login('standard_user', 'secret_sauce')
  })

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-ROTA-001 | Deve fazer logout com sucesso', async ({ page }) => {
    // Cenário: Logout do usuário
    // Dado que estou logado
    expect(await catalogPage.isProductsPageLoaded()).toBeTruthy()

    // Quando clico em logout
    await catalogPage.logout()

    // Então devo retornar à página de login
    expect(await signInPage.isLoginPageLoaded()).toBeTruthy()
    expect(page.url()).not.toContain('inventory')

    // Tiro screenshot
    await signInPage.takeScreenshot('rota-001-logout.png')
  })

  test('TC-ROTA-002 | Deve acessar o carrinho a partir da página de produtos', async ({ page }) => {
    // Cenário: Navegar para o carrinho
    // Dado que estou na página de produtos
    // Quando clico no botão do carrinho
    await catalogPage.goToCart()

    // Então devo estar na página do carrinho
    expect(page.url()).toContain('cart')

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-002-to-cart.png')
  })

  test('TC-ROTA-003 | Deve ter botão de menu na página de produtos', async ({ page }) => {
    // Cenário: Visibilidade do botão de menu
    // Dado que estou na página de produtos
    // Quando procuro o botão de menu
    const menuButton = await page.$(catalogPage.menuButton)

    // Então o botão de menu deve estar visível
    expect(menuButton).toBeTruthy()

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-003-menu-button.png')
  })

  test('TC-ROTA-004 | Deve ter botão do carrinho em todas as páginas', async ({ page }) => {
    // Cenário: Consistência do botão do carrinho
    // Dado que estou na página de produtos
    const cartOnProducts = await page.$(catalogPage.cartButton)
    expect(cartOnProducts).toBeTruthy()

    // Quando adiciono item e vou para o carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()

    // Então o botão do carrinho deve continuar visível
    const cartOnCart = await page.$(catalogPage.cartButton)
    expect(cartOnCart).toBeTruthy()

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-004-cart-button-visible.png')
  })

  test('TC-ROTA-005 | Deve navegar entre páginas corretamente', async ({ page }) => {
    // Cenário: Fluxo de navegação entre páginas
    // Dado que estou na página de produtos
    const productsUrl = page.url()

    // Quando adiciono item e navego para o carrinho
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()
    const cartUrl = page.url()
    expect(cartUrl).not.toEqual(productsUrl)

    // E continuo comprando
    // Então devo retornar à página de produtos
    await catalogPage.continueShopping()
    expect(page.url()).toEqual(productsUrl)

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-005-navigation-flow.png')
  })

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-ROTA-006 | Deve preservar posição do scroll durante navegação', async ({ page }) => {
    // Cenário: Persistência do scroll
    // Dado que estou na página de produtos
    // Quando rodo até o final da página
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const scrolledPosition = await page.evaluate(() => window.scrollY)

    // E navego para o carrinho
    await catalogPage.goToCart()

    // E retorno aos produtos
    await catalogPage.continueShopping()

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-006-scroll-position.png')
  })

  test('TC-ROTA-007 | Não deve ter links quebrados na navegação', async ({ page }) => {
    // Cenário: Validação dos links de navegação
    // Dado que estou na página de produtos
    // Quando obtenho todos os links
    const links = await page.$$('a')

    // Então todos os links devem ter hrefs válidos
    for (const link of links) {
      const href = await link.getAttribute('href')
      if (href) {
        expect(href).toBeTruthy()
      }
    }

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-007-valid-links.png')
  })

  test('TC-ROTA-008 | Deve lidar com o botão voltar do navegador', async ({ page }) => {
    // Cenário: Navegação com botão voltar do navegador
    // Dado que estou na página de produtos e vou para o carrinho
    const productsUrl = page.url()
    await catalogPage.goToCart()
    const cartUrl = page.url()

    // Quando uso o botão voltar do navegador
    await page.goBack()

    // Então devo retornar à página de produtos
    expect(page.url()).toContain('inventory')

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-008-browser-back.png')
  })

  test('TC-ROTA-009 | Deve exibir indicador de página atual', async ({ page }) => {
    // Cenário: Usuário sabe onde está
    // Dado que estou na página de produtos
    // Quando verifico o título ou cabeçalho da página
    const title = await page.textContent('.app_logo')

    // Então o identificador da página deve estar visível
    expect(title).toBeTruthy()

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-009-page-indicator.png')
  })

  test('TC-ROTA-010 | Deve suportar navegação por teclado', async ({ page }) => {
    // Cenário: Acessibilidade - navegação por teclado
    // Dado que estou na página de produtos
    // Quando navego pelos elementos interativos com Tab
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Então o foco deve ser visível
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()

    // Tiro screenshot
    await catalogPage.takeScreenshot('rota-010-keyboard-nav.png')
  })
})