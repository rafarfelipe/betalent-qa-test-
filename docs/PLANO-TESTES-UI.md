# 📋 Plano de Testes de UI - Sauce Demo

## 1. Visão Geral

Este documento detalha o plano completo de testes de UI para a plataforma Sauce Demo, um e-commerce de demonstração utilizado para validar funcionalidades essenciais de uma aplicação web.

**URL da Aplicação**: https://www.saucedemo.com

Todos os testes de UI/UX deste desafio devem ser executados no SauceDemo. O código usa `UI_BASE_URL` quando informado; caso contrário, usa `https://www.saucedemo.com`.

**Ambiente**: Produção

**Data de Criação**: 11 de Maio de 2026

---

## 2. Objetivo dos Testes

Validar as principais funcionalidades da plataforma Sauce Demo, incluindo:
- Autenticação de usuários
- Gestão de produtos (listagem, ordenação, filtragem)
- Carrinho de compras
- Fluxo de checkout
- Navegação e logout
- Responsividade em diferentes dispositivos
- Acessibilidade

---

## 3. Escopo dos Testes

### ✅ Incluído
- Login e logout
- Navegação principal
- Gerenciamento de produtos
- Carrinho de compras (CRUD)
- Processo de checkout completo
- Validações de formulários
- Testes em múltiplos navegadores (Chrome, Firefox, Safari)
- Testes responsivos (Desktop, Tablet, Mobile)
- Testes de acessibilidade básica

### ❌ Excluído
- Testes de performance detalhados
- Testes de penetração
- Testes de carga
- Integração com sistemas externos

---

## 4. Tipos de Testes

### 4.1 Testes de Autenticação

#### TC-LOGIN-001 | Login com Usuário Padrão
- **Objetivo**: Validar login com credenciais de usuário padrão
- **Pré-requisito**: Página de login acessível
- **Passos**:
  1. Navegar para https://www.saucedemo.com
  2. Inserir username: `standard_user`
  3. Inserir password: `secret_sauce`
  4. Clicar em "Login"
- **Resultado Esperado**:
  - ✅ Redirecionado para página de produtos
  - ✅ Título da página contém "Swag Labs"
  - ✅ Container de produtos visível
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-LOGIN-002 | Login com Usuário Problem
- **Objetivo**: Validar login de usuário com problemas conhecidos
- **Usuário**: `problem_user` / `secret_sauce`
- **Resultado Esperado**: ✅ Login bem-sucedido (apesar do nome)
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-LOGIN-003 | Login com Performance Glitch User
- **Objetivo**: Validar login com usuário que tem problemas de performance
- **Usuário**: `performance_glitch_user` / `secret_sauce`
- **Resultado Esperado**: ✅ Login bem-sucedido (pode ser lento)
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-LOGIN-004 | Erro com Senha Inválida
- **Objetivo**: Validar mensagem de erro com senha incorreta
- **Dados**: Username: `standard_user`, Password: `wrong_password`
- **Resultado Esperado**:
  - ✅ Mensagem de erro exibida
  - ✅ Erro contém "do not match any user"
  - ✅ Permanece na página de login
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-LOGIN-005 | Erro com Usuário Inválido
- **Objetivo**: Validar mensagem de erro com usuário inexistente
- **Dados**: Username: `invalid_user`, Password: `secret_sauce`
- **Resultado Esperado**: ✅ Mensagem de erro exibida
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-LOGIN-006 | Erro com Campos Vazios
- **Objetivo**: Validar validação de campos obrigatórios
- **Dados**: Username vazio, Password vazio
- **Resultado Esperado**:
  - ✅ Mensagem de erro: "Username is required"
  - ✅ Campo de username destacado
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-LOGIN-007 | Mascaramento de Senha (Nível 2)
- **Objetivo**: Validar que campo de senha é mascarado
- **Resultado Esperado**: 
  - ✅ Atributo `type="password"` no campo
  - ✅ Caracteres não visíveis
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-LOGIN-008 | Acessibilidade - Labels (Nível 2)
- **Objetivo**: Validar que labels estão associados aos inputs
- **Resultado Esperado**:
  - ✅ Elemento `<label for="user-name">` existe
  - ✅ Elemento `<label for="password">` existe
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-LOGIN-009 | Responsividade Mobile (Nível 2)
- **Objetivo**: Validar login em viewport mobile (375x667)
- **Resultado Esperado**: ✅ Login funciona sem problemas
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-LOGIN-010 | Responsividade Tablet (Nível 2)
- **Objetivo**: Validar login em viewport tablet (768x1024)
- **Resultado Esperado**: ✅ Login funciona sem problemas
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

### 4.2 Testes de Produtos

#### TC-CATALOG-001 | Exibir Todos os Produtos
- **Objetivo**: Validar listagem de produtos
- **Pré-requisito**: Usuário logado
- **Resultado Esperado**:
  - ✅ Mínimo 6 produtos exibidos
  - ✅ Cada produto tem nome e preço
  - ✅ Container de produtos visível
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CATALOG-002 | Ordenar Produtos A-Z
- **Objetivo**: Validar ordenação alfabética crescente
- **Ação**: Selecionar "Name (A to Z)"
- **Resultado Esperado**:
  - ✅ Produtos ordenados alfabeticamente A-Z
  - ✅ Verificação com nomes capturados
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CATALOG-003 | Ordenar Produtos Z-A
- **Objetivo**: Validar ordenação alfabética decrescente
- **Ação**: Selecionar "Name (Z to A)"
- **Resultado Esperado**: ✅ Produtos ordenados Z-A
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CATALOG-004 | Ordenar por Preço Menor para Maior
- **Objetivo**: Validar ordenação de preço crescente
- **Ação**: Selecionar "Price (low to high)"
- **Resultado Esperado**:
  - ✅ Produtos ordenados por preço crescente
  - ✅ Validação de valores numéricos
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CATALOG-005 | Ordenar por Preço Maior para Menor
- **Objetivo**: Validar ordenação de preço decrescente
- **Ação**: Selecionar "Price (high to low)"
- **Resultado Esperado**: ✅ Produtos ordenados por preço decrescente
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CATALOG-006 | Adicionar Produto ao Carrinho
- **Objetivo**: Validar adição de produto
- **Ação**: Clicar "Add to cart" no primeiro produto
- **Resultado Esperado**:
  - ✅ Badge do carrinho mostra "1"
  - ✅ Botão muda para "Remove"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CATALOG-007 | Remover Produto do Carrinho
- **Objetivo**: Validar remoção de produto
- **Pré-requisito**: Produto adicionado ao carrinho
- **Ação**: Clicar "Remove"
- **Resultado Esperado**:
  - ✅ Badge do carrinho desaparece
  - ✅ Botão volta a "Add to cart"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CATALOG-008 | Navegar para Carrinho
- **Objetivo**: Validar navegação para carrinho
- **Ação**: Clicar ícone do carrinho
- **Resultado Esperado**:
  - ✅ URL contém "/cart"
  - ✅ Página do carrinho carregada
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CATALOG-009 | Validar Formato de Preços (Nível 2)
- **Objetivo**: Validar que preços têm formato correto
- **Resultado Esperado**:
  - ✅ Todos os preços começam com "$"
  - ✅ Valores são números válidos > 0
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-CATALOG-010 | Adicionar Múltiplos Produtos (Nível 2)
- **Objetivo**: Validar adição de vários produtos
- **Ação**: Adicionar 3 produtos
- **Resultado Esperado**: ✅ Badge mostra "3"
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-CATALOG-011 | Responsividade Mobile (Nível 2)
- **Objetivo**: Validar exibição em mobile
- **Viewport**: 375x667
- **Resultado Esperado**: ✅ Produtos visíveis e scrolláveis
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-CATALOG-012 | Validar Imagens de Produtos (Nível 2)
- **Objetivo**: Validar que imagens são exibidas
- **Resultado Esperado**: ✅ Mínimo 6 imagens visíveis
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

### 4.3 Testes de Carrinho

#### TC-CARRINHO-001 | Carrinho Vazio
- **Objetivo**: Validar estado inicial do carrinho
- **Pré-requisito**: Usuário logado sem produtos
- **Resultado Esperado**:
  - ✅ Carrinho vazio exibido
  - ✅ Nenhum item na lista
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CARRINHO-002 | Adicionar Item e Verificar no Carrinho
- **Objetivo**: Validar que item adicionado aparece no carrinho
- **Ação**: Adicionar produto e ir para carrinho
- **Resultado Esperado**:
  - ✅ Produto aparece no carrinho
  - ✅ Nome e preço corretos
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CARRINHO-003 | Remover Item do Carrinho
- **Objetivo**: Validar remoção de item
- **Pré-requisito**: Carrinho com 1 item
- **Ação**: Clicar "Remove"
- **Resultado Esperado**: ✅ Carrinho fica vazio
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CARRINHO-004 | Múltiplos Itens no Carrinho
- **Objetivo**: Validar carrinho com múltiplos items
- **Ação**: Adicionar 3 produtos
- **Resultado Esperado**: ✅ Carrinho mostra 3 items
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CARRINHO-005 | Remover Item Específico
- **Objetivo**: Validar remoção de item específico
- **Pré-requisito**: Carrinho com 3 items
- **Ação**: Remover primeiro item
- **Resultado Esperado**: ✅ Carrinho fica com 2 items
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CARRINHO-006 | Prosseguir para Checkout
- **Objetivo**: Validar transição para checkout
- **Pré-requisito**: Carrinho com items
- **Ação**: Clicar "Checkout"
- **Resultado Esperado**:
  - ✅ URL contém "checkout-step-one"
  - ✅ Formulário de informações exibido
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-CARRINHO-007 | Continuar Comprando
- **Objetivo**: Validar retorno para produtos
- **Ação**: Clicar "Continue Shopping" no carrinho
- **Resultado Esperado**:
  - ✅ Retorna para página de produtos
  - ✅ Carrinho mantém items
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-CARRINHO-008 | Calcular Total (Nível 2)
- **Objetivo**: Validar cálculo de total
- **Resultado Esperado**:
  - ✅ Total é exibido
  - ✅ Total contém "$"
  - ✅ Valor é correto
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-CARRINHO-009 | Persistência do Carrinho (Nível 2)
- **Objetivo**: Validar que carrinho persiste entre navegações
- **Ação**: Adicionar item, ir para carrinho, voltar
- **Resultado Esperado**: ✅ Quantidade de items mantida
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-CARRINHO-010 | Responsividade Mobile (Nível 2)
- **Objetivo**: Validar carrinho em mobile
- **Viewport**: 375x667
- **Resultado Esperado**: ✅ Carrinho acessível em mobile
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

### 4.4 Testes de Checkout

#### TC-PAGAMENTO-001 | Preencher Informações e Continuar
- **Objetivo**: Validar primeiro passo do checkout
- **Dados**: First Name: "John", Last Name: "Doe", Postal Code: "12345"
- **Ação**: Preencher e clicar "Continue"
- **Resultado Esperado**:
  - ✅ Transição para página de revisão
  - ✅ URL muda para checkout-step-two
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-002 | Validar First Name Obrigatório
- **Objetivo**: Validar campo first name obrigatório
- **Ação**: Deixar vazio e tentar continuar
- **Resultado Esperado**:
  - ✅ Mensagem de erro exibida
  - ✅ Erro contém "First Name is required"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-003 | Validar Last Name Obrigatório
- **Objetivo**: Validar campo last name obrigatório
- **Ação**: Deixar vazio e tentar continuar
- **Resultado Esperado**: ✅ Mensagem de erro exibida
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-004 | Validar Postal Code Obrigatório
- **Objetivo**: Validar campo postal code obrigatório
- **Ação**: Deixar vazio e tentar continuar
- **Resultado Esperado**: ✅ Mensagem de erro exibida
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-005 | Completar Checkout com Sucesso
- **Objetivo**: Validar fluxo completo de checkout
- **Ação**: Preencher dados e clicar "Finish"
- **Resultado Esperado**:
  - ✅ Página de confirmação exibida
  - ✅ Mensagem de sucesso: "Thank you for your order"
  - ✅ URL contém "checkout-complete"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-006 | Exibir Resumo do Pedido
- **Objetivo**: Validar revisão de pedido antes de finalizar
- **Resultado Esperado**:
  - ✅ Botão "Finish" visível
  - ✅ Items do pedido listados
  - ✅ Total do pedido exibido
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-007 | Cancelar Checkout
- **Objetivo**: Validar cancelamento do checkout
- **Ação**: Clicar botão "Cancel"
- **Resultado Esperado**:
  - ✅ Retorna para carrinho
  - ✅ URL contém "/cart"
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-008 | Caracteres Especiais em Nomes (Nível 2)
- **Objetivo**: Validar aceitar nomes com caracteres especiais
- **Dados**: "Jean-Pierre", "O'Neill", "12345"
- **Resultado Esperado**: ✅ Checkout succeeds
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-009 | Validar Múltiplos Formatos de Postal Code (Nível 2)
- **Objetivo**: Validar diferentes formatos de postal code
- **Dados**: "12345", "90210", "00000"
- **Resultado Esperado**: ✅ Todos os formatos aceitos
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-010 | Validar Items na Revisão (Nível 2)
- **Objetivo**: Validar que items aparecem na revisão
- **Resultado Esperado**: ✅ Items do carrinho visíveis
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-PAGAMENTO-011 | Responsividade Mobile (Nível 2)
- **Objetivo**: Validar checkout em mobile
- **Viewport**: 375x667
- **Resultado Esperado**: ✅ Formulário acessível em mobile
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

### 4.5 Testes de Navegação

#### TC-ROTA-001 | Logout
- **Objetivo**: Validar logout do usuário
- **Ação**: Abrir menu e clicar "Logout"
- **Resultado Esperado**:
  - ✅ Retorna para página de login
  - ✅ Sessão encerrada
  - ✅ URL não contém "inventory"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-ROTA-002 | Navegação para Carrinho
- **Objetivo**: Validar botão de carrinho
- **Resultado Esperado**: ✅ Navega para página de carrinho
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-ROTA-003 | Botão Menu Visível
- **Objetivo**: Validar menu de navegação
- **Resultado Esperado**: ✅ Botão menu visível e clicável
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-ROTA-004 | Botão Carrinho em Todas Páginas
- **Objetivo**: Validar consistência do botão carrinho
- **Resultado Esperado**: ✅ Botão visível em todas as páginas
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-ROTA-005 | Fluxo de Navegação
- **Objetivo**: Validar navegação entre páginas
- **Ação**: Ir para carrinho, depois voltar aos produtos
- **Resultado Esperado**: ✅ Navegação funciona corretamente
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-ROTA-006 | Posição de Scroll (Nível 2)
- **Objetivo**: Validar scroll persistence
- **Resultado Esperado**: ✅ Scroll não volta para topo
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-ROTA-007 | Links Válidos (Nível 2)
- **Objetivo**: Validar que todos os links são válidos
- **Resultado Esperado**: ✅ Nenhum link quebrado
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-ROTA-008 | Browser Back Button (Nível 2)
- **Objetivo**: Validar botão voltar do navegador
- **Ação**: Usar browser back button
- **Resultado Esperado**: ✅ Volta para página anterior
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-ROTA-009 | Indicador de Página Atual (Nível 2)
- **Objetivo**: Validar que usuário sabe onde está
- **Resultado Esperado**: ✅ Logo ou título da página visível
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

#### TC-ROTA-010 | Navegação por Teclado (Nível 2)
- **Objetivo**: Validar navegação por Tab
- **Ação**: Pressionar Tab várias vezes
- **Resultado Esperado**: ✅ Foco em elementos interativos
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

## 5. Dados de Teste

### Usuários Disponíveis

```
standard_user / secret_sauce       (Usuário padrão - sem problemas)
problem_user / secret_sauce        (Usuário com problemas visuais)
performance_glitch_user / secret_sauce  (Usuário com problemas de performance)
locked_out_user / secret_sauce     (Usuário bloqueado)
```

### Dados de Checkout

```
First Name: John, Doe, Alice, Bob, Charlie
Last Name: Doe, Smith, Johnson, Williams, Brown
Postal Code: 12345, 90210, 00000, 99999
```

---

## 6. Critérios de Aceitação

### Automação com Playwright

- ✅ Todos os testes implementados em BDD style
- ✅ Page Object Model utilizado
- ✅ Screenshots capturados em falhas
- ✅ Suporte a múltiplos navegadores
- ✅ Testes responsivos (Desktop, Tablet, Mobile)

### Cobertura

- ✅ Nível 1: 33 testes obrigatórios
- ✅ Nível 2: 20 testes diferenciais
- ✅ Total: 53 testes de UI

### Documentação

- ✅ Cada teste tem caso de uso documentado
- ✅ Screenshots de evidência
- ✅ BDD comments estruturados

---

## 7. Ambiente de Execução

### Navegadores Testados
- ✅ Chrome (Chromium)
- ✅ Firefox
- ✅ Safari (WebKit)

### Dispositivos
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

### Sistemas Operacionais
- Windows 10/11
- macOS
- Linux

---

## 8. Métricas

| Métrica | Valor |
|---------|-------|
| Total de Testes | 53 |
| Testes de Nível 1 | 33 |
| Testes de Nível 2 | 20 |
| Cobertura de Funcionalidades | 100% |
| Tempo Estimado de Execução | 15-20 minutos |

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Elementos não encontrados | Média | Alto | Usar seletores CSS específicos |
| Timeouts na execução | Baixa | Médio | Aumentar timeout em dev |
| Flakiness em testes | Média | Médio | Usar wait explícitos |
| Mudanças na UI | Média | Alto | Manter seletores atualizados |

---

## 10. Conclusão

Este plano de testes fornece cobertura abrangente das funcionalidades essenciais do Sauce Demo, com foco em qualidade, acessibilidade e responsividade. A implementação em Playwright com BDD style garante testes maintíveis e legíveis.
