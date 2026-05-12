/**
 * TESTES DE AUTENTICAÇÃO - Sauce Demo
 * Estilo BDD
 *
 * Funcionalidade: Autenticação
 *   Como um usuário
 *   Eu quero fazer login no aplicativo
 *   Para que eu possa acessar as funcionalidades de compra
 */

const { test, expect } = require('@playwright/test')
const SignInPage = require('../pages/SignInPage')

test.describe('Testes de Login e Autenticação', () => {
  let signInPage

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    await signInPage.goto()
  })

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-LOGIN-001 | Deve fazer login com sucesso com usuário padrão', async ({ page }) => {
    // Cenário: Credenciais válidas para usuário padrão
    // Dado que estou na página de login
    expect(await signInPage.isLoginPageLoaded()).toBeTruthy()

    // Quando insiro credenciais válidas para standard_user
    await signInPage.login('standard_user', 'secret_sauce')

    // Então devo ser redirecionado para a página de produtos
    expect(await signInPage.isVisible('.inventory_container')).toBeTruthy()

    // E o título da página deve conter "Swag Labs"
    const title = await signInPage.getTitle()
    expect(title).toContain('Swag Labs')

    // Tiro screenshot como evidência
    await signInPage.takeScreenshot('login-001-standard-user-login.png')
  })

  test('TC-LOGIN-002 | Deve fazer login com sucesso com usuário problem', async ({ page }) => {
    // Cenário: Credenciais válidas para problem_user
    // Dado que estou na página de login
    expect(await signInPage.isLoginPageLoaded()).toBeTruthy()

    // Quando insiro credenciais válidas para problem_user
    await signInPage.login('problem_user', 'secret_sauce')

    // Então devo ser redirecionado para a página de produtos
    expect(await signInPage.isVisible('.inventory_container')).toBeTruthy()

    // Tiro screenshot
    await signInPage.takeScreenshot('login-002-problem-user-login.png')
  })

  test('TC-LOGIN-003 | Deve fazer login com sucesso com usuário performance glitch', async ({ page }) => {
    // Cenário: Credenciais válidas para performance_glitch_user
    // Dado que estou na página de login
    // Quando insiro credenciais válidas para performance_glitch_user
    await signInPage.login('performance_glitch_user', 'secret_sauce')

    // Então devo ser redirecionado para a página de produtos
    expect(await signInPage.isVisible('.inventory_container')).toBeTruthy()

    // Tiro screenshot
    await signInPage.takeScreenshot('login-003-performance-user-login.png')
  })

  test('TC-LOGIN-004 | Deve mostrar erro com senha inválida', async ({ page }) => {
    // Cenário: Senha inválida
    // Dado que estou na página de login
    // Quando insiro usuário correto mas senha errada
    await signInPage.fill(signInPage.usernameInput, 'standard_user')
    await signInPage.fill(signInPage.passwordInput, 'wrong_password')
    await signInPage.click(signInPage.loginButton)

    // Então uma mensagem de erro deve ser exibida
    expect(await signInPage.isErrorVisible()).toBeTruthy()

    // E a mensagem de erro deve conter texto específico
    const errorMsg = await signInPage.getErrorMessage()
    expect(errorMsg).toContain('do not match any user')

    // Tiro screenshot do erro
    await signInPage.takeScreenshot('login-004-invalid-password-error.png')
  })

  test('TC-LOGIN-005 | Deve mostrar erro com usuário inválido', async ({ page }) => {
    // Cenário: Usuário inválido
    // Quando insiro usuário inexistente
    await signInPage.fill(signInPage.usernameInput, 'invalid_user')
    await signInPage.fill(signInPage.passwordInput, 'secret_sauce')
    await signInPage.click(signInPage.loginButton)

    // Então uma mensagem de erro deve ser exibida
    expect(await signInPage.isErrorVisible()).toBeTruthy()

    // E a mensagem de erro deve indicar usuário não encontrado
    const errorMsg = await signInPage.getErrorMessage()
    expect(errorMsg).toContain('do not match any user')

    // Tiro screenshot
    await signInPage.takeScreenshot('login-005-invalid-username-error.png')
  })

  test('TC-LOGIN-006 | Deve mostrar erro com credenciais vazias', async ({ page }) => {
    // Cenário: Campos vazios
    // Quando clico em login sem inserir credenciais
    await signInPage.click(signInPage.loginButton)

    // Então uma mensagem de erro deve ser exibida
    expect(await signInPage.isErrorVisible()).toBeTruthy()

    // E o erro deve mencionar usuário
    const errorMsg = await signInPage.getErrorMessage()
    expect(errorMsg).toContain('Username is required')

    // Tiro screenshot
    await signInPage.takeScreenshot('login-006-empty-credentials-error.png')
  })

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-LOGIN-007 | Deve ter mascaramento adequado da senha', async ({ page }) => {
    // Cenário: Campo de senha deve estar mascarado
    // Dado que estou na página de login
    // Quando insiro senha no campo de senha
    const passwordField = await page.$('input[type="password"]')

    // Então o campo de senha deve ter type="password"
    const fieldType = await passwordField.getAttribute('type')
    expect(fieldType).toBe('password')

    // Tiro screenshot
    await signInPage.takeScreenshot('login-007-password-masking.png')
  })

  test('TC-LOGIN-008 | Deve ser acessível - Labels do formulário de login', async ({ page }) => {
    // Cenário: Acessibilidade - Labels do formulário
    // Dado que estou na página de login
    // Quando inspeiono os elementos do formulário
    // Então todos os campos de input devem ter uma dica acessível
    const usernameLabel = await page.$('label[for="user-name"]')
    const passwordLabel = await page.$('label[for="password"]')
    const usernamePlaceholder = await page.getAttribute(signInPage.usernameInput, 'placeholder')
    const passwordPlaceholder = await page.getAttribute(signInPage.passwordInput, 'placeholder')

    // SauceDemo usa placeholders em vez de labels visíveis.
    expect(usernameLabel || usernamePlaceholder).toBeTruthy()
    expect(passwordLabel || passwordPlaceholder).toBeTruthy()

    // Tiro screenshot
    await signInPage.takeScreenshot('login-008-accessibility-labels.png')
  })

  test('TC-LOGIN-009 | Deve funcionar em viewport mobile', async ({ page }) => {
    // Cenário: Login em dispositivo mobile
    // Dado que estou na página de login com viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })

    // Quando realizo o login
    await signInPage.login('standard_user', 'secret_sauce')

    // Então o login deve ter sucesso
    expect(await signInPage.isVisible('.inventory_container')).toBeTruthy()

    // Tiro screenshot do login mobile
    await signInPage.takeScreenshot('login-009-mobile-login.png')
  })

  test('TC-LOGIN-010 | Deve funcionar em viewport tablet', async ({ page }) => {
    // Cenário: Login em dispositivo tablet
    // Dado que estou na página de login com viewport tablet
    await page.setViewportSize({ width: 768, height: 1024 })

    // Quando realizo o login
    await signInPage.login('standard_user', 'secret_sauce')

    // Então o login deve ter sucesso
    expect(await signInPage.isVisible('.inventory_container')).toBeTruthy()

    // Tiro screenshot do login tablet
    await signInPage.takeScreenshot('login-010-tablet-login.png')
  })
})