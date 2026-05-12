/**
 * TESTES DE CHECKOUT - Sauce Demo
 * Estilo BDD
 *
 * Funcionalidade: Processo de Compra
 *   Como um comprador
 *   Eu quero completar minha compra
 *   Para que eu possa receber meus itens
 */

const { test, expect } = require('@playwright/test')
const SignInPage = require('../pages/SignInPage')
const CatalogPage = require('../pages/CatalogPage')
const ShoppingCartPage = require('../pages/ShoppingCartPage')
const PaymentPage = require('../pages/PaymentPage')

test.describe('Fluxo de Checkout', () => {
  let signInPage
  let catalogPage
  let shoppingCartPage
  let paymentPage

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    catalogPage = new CatalogPage(page)
    shoppingCartPage = new ShoppingCartPage(page)
    paymentPage = new PaymentPage(page)

    // Login e adiciona item ao carrinho
    await signInPage.goto()
    await signInPage.login('standard_user', 'secret_sauce')
    await catalogPage.addProductToCart(0)
    await catalogPage.goToCart()
    await shoppingCartPage.proceedToCheckout()
  })

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-PAGAMENTO-001 | Deve preencher informações do checkout e continuar', async ({ page }) => {
    // Cenário: Completar primeiro passo do checkout
    // Dado que estou na página de checkout
    expect(page.url()).toContain('checkout-step-one')

    // Quando preencho todas as informações obrigatórias
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)

    // E clico em continuar
    await paymentPage.clickContinue()

    // Então devo prosseguir para a página de revisão
    expect(await paymentPage.isReviewPageLoaded()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-001-info-filled.png')
  })

  test('TC-PAGAMENTO-002 | Deve validar que primeiro nome é obrigatório', async ({ page }) => {
    // Cenário: Primeiro nome ausente
    // Dado que estou na página de checkout
    // Quando deixo o primeiro nome vazio e tento continuar
    const checkoutInfo = {
      firstName: '',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Então o erro deve ser exibido
    expect(await paymentPage.isErrorVisible()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-002-firstname-required.png')
  })

  test('TC-PAGAMENTO-003 | Deve validar que sobrenome é obrigatório', async ({ page }) => {
    // Cenário: Sobrenome ausente
    // Dado que estou na página de checkout
    // Quando deixo o sobrenome vazio
    const checkoutInfo = {
      firstName: 'John',
      lastName: '',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Então o erro deve ser exibido
    expect(await paymentPage.isErrorVisible()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-003-lastname-required.png')
  })

  test('TC-PAGAMENTO-004 | Deve validar que CEP é obrigatório', async ({ page }) => {
    // Cenário: CEP ausente
    // Quando deixo o CEP vazio
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: ''
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Então o erro deve ser exibido
    expect(await paymentPage.isErrorVisible()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-004-postalcode-required.png')
  })

  test('TC-PAGAMENTO-005 | Deve completar checkout com sucesso', async ({ page }) => {
    // Cenário: Completar fluxo completo de checkout
    // Dado que estou na página de checkout
    // Quando preencho todas as informações e continuo
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // E clico no botão finalizar
    await paymentPage.finishCheckout()

    // Então devo ver a página de checkout completo
    expect(await paymentPage.isCheckoutComplete()).toBeTruthy()

    // E a mensagem de sucesso deve ser exibida
    const message = await paymentPage.getCompleteMessage()
    expect(message).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-005-complete-success.png')
  })

  test('TC-PAGAMENTO-006 | Deve exibir resumo do pedido antes de completar', async ({ page }) => {
    // Cenário: Revisar pedido antes de completar
    // Dado que preenchi as informações do checkout e continuei
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Quando estou na página de revisão
    // Então o botão finalizar deve estar visível
    expect(await paymentPage.isVisible(paymentPage.finishButton)).toBeTruthy()

    // Tiro screenshot da revisão do pedido
    await paymentPage.takeScreenshot('pagamento-006-order-review.png')
  })

  test('TC-PAGAMENTO-007 | Deve permitir cancelar o checkout', async ({ page }) => {
    // Cenário: Cancelar processo de checkout
    // Dado que estou na página de checkout
    // Quando clico no botão cancelar
    await paymentPage.clickCancel()

    // Então devo retornar ao carrinho
    expect(page.url()).toContain('cart')

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-007-cancel-checkout.png')
  })

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-PAGAMENTO-008 | Deve suportar caracteres especiais nos nomes', async ({ page }) => {
    // Cenário: Nomes com caracteres especiais
    // Dado que estou na página de checkout
    // Quando insiro nomes com caracteres especiais
    const checkoutInfo = {
      firstName: "Jean-Pierre",
      lastName: "O'Neill",
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Então o checkout deve ter sucesso
    expect(await paymentPage.isReviewPageLoaded()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-008-special-characters.png')
  })

  test('TC-PAGAMENTO-009 | Deve lidar com CEPs numéricos', async ({ page }) => {
    // Cenário: Vários formatos de CEP
    // Dado que estou na página de checkout
    // Quando insiro diferentes CEPs válidos
    const postalCodes = ['12345', '90210', '00000']

    for (const code of postalCodes) {
      await paymentPage.fillCheckoutInfo({
        firstName: 'John',
        lastName: 'Doe',
        postalCode: code
      })
      await paymentPage.clickContinue()
      expect(await paymentPage.isReviewPageLoaded()).toBeTruthy()

      // Volto ao passo anterior para próxima iteração
      await signInPage.goto()
      await signInPage.login('standard_user', 'secret_sauce')
      await catalogPage.addProductToCart(0)
      await catalogPage.goToCart()
      await shoppingCartPage.proceedToCheckout()
    }

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-009-postal-codes.png')
  })

  test('TC-PAGAMENTO-010 | Deve exibir contagem correta de itens na revisão', async ({ page }) => {
    // Cenário: Verificar item na revisão do pedido
    // Dado que adicionei itens ao carrinho e continuo o checkout
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Quando estou na página de revisão
    // Então devo ver o item
    const hasItems = await paymentPage.isVisible('.cart_item')
    expect(hasItems).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-010-item-review.png')
  })

  test('TC-PAGAMENTO-011 | Deve ser responsivo no checkout mobile', async ({ page }) => {
    // Cenário: Checkout mobile
    // Dado que defino viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })

    // Quando preencho as informações do checkout
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await paymentPage.fillCheckoutInfo(checkoutInfo)
    await paymentPage.clickContinue()

    // Então o formulário deve ser acessível em mobile
    expect(await paymentPage.isReviewPageLoaded()).toBeTruthy()

    // Tiro screenshot
    await paymentPage.takeScreenshot('pagamento-011-mobile-responsive.png')
  })
})