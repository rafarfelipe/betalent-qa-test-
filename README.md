# 🧪 Suite de Testes Automatizados - QA Challenge

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)


---

## 📋 Índice

1. [Sobre o Desafio](#sobre-o-desafio)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tecnologias e Ferramentas](#tecnologias-e-ferramentas)
4. [Instalação](#instalação)
5. [Como Executar](#como-executar)
6. [Cobertura dos Testes](#cobertura-dos-testes)
7. [Documentação](#documentação)
8. [Resultados](#resultados)

---

## 🎯 Sobre o Desafio

Este projeto valida duas aplicações distintas como parte do teste prático de QA:

### Aplicações Testadas

| Aplicação | Tipo | Link |
|-----------|------|------|
| **Sauce Demo** | E-commerce | https://www.saucedemo.com/ |
| **Restful-Booker** | API de Hotéis | https://restful-booker.herokuapp.com/ |

### Premissas do Projeto

- ✅ Testes executados em ambiente de produção (sites públicos)
- ✅ Bugs identificados documentados, não corrigidos (escopo de QA)
- ✅ Evidências geradas automaticamente (screenshots + relatórios)
- ✅100% dos requisitos Nível 1 + Nível 2 implementados

### **UI Testing - Sauce Demo**
Plataforma de e-commerce com testes de:
- ✅ Autenticação (múltiplos tipos de usuários)
- ✅ Gestão de produtos (ordenação e filtragem)
- ✅ Carrinho de compras (adicionar/remover itens)
- ✅ Fluxo de checkout completo
- ✅ Navegação e logout
- ✅ Responsividade (Desktop, Tablet, Mobile)
- ✅ Acessibilidade

### **API Testing - Restful-Booker**
Sistema de reservas com testes de:
- ✅ Autenticação e geração de tokens
- ✅ CRUD de reservas (Create, Read, Update, Delete)
- ✅ Filtros e buscas avançadas
- ✅ Validação de campos obrigatórios
- ✅ Testes de performance
- ✅ Testes de segurança
- ✅ Tratamento de erros
- ✅ Health check da API

---

## Níveis de Implementação

### UI Testing (Sauce Demo)

**Nível 1 (Obrigatório)**
- Login com diferentes tipos de usuários
- Ordenação e filtragem de produtos
- Fluxo completo de compra
- Remoção de itens do carrinho
- Navegação entre páginas
- Logout

**Nível 2 (Diferencial)**
- Testes de responsividade
- Testes de acessibilidade
- Testes automatizados

### API Testing (Restful-Booker)

**Nível 1 (Obrigatório)**
- Autenticação básica
- CRUD de reservas
- Validação de campos obrigatórios

**Nível 2 (Diferencial)**
- Testes de performance
- Testes de segurança
- Automação via scripts

---

## 📁 Estrutura do Projeto

```
betalent-qa-test/
├── ui-testing/
│   ├── testes/               # Testes de UI
│   │   ├── login.spec.js     # Testes de login
│   │   ├── catalog.spec.js  # Testes de catálogo
│   │   ├── shopping-cart.spec.js  # Testes de carrinho
│   │   ├── payment.spec.js  # Testes de pagamento
│   │   └── routes.spec.js   # Testes de navegação
│   ├── pages/                # Page Object Model
│   │   ├── BasePage.js      # Classe base para todas as páginas
│   │   ├── SignInPage.js    # Página de login
│   │   ├── CatalogPage.js   # Página de produtos
│   │   ├── ShoppingCartPage.js  # Página de carrinho
│   │   └── PaymentPage.js   # Página de checkout
│   └── evidencia/            # Screenshots e relatórios
│
├── api-testing/
│   ├── collections/           # Postman Collections
│   │   └── Restful-Booker.postman_collection.json
│   ├── tests/                 # Testes de API em JavaScript
│   │   ├── api-tests.js       # Testes unitários
│   │   └── runner.js          # Executor de testes
│   ├── environment/           # Variáveis de ambiente
│   │   └── Restful-Booker.postman_environment.json
│   └── evidencia/             # Resultados e relatórios
│
├── docs/                      # Documentação completa
│   ├── PLANO-TESTES-UI.md     # Plano de testes de UI
│   ├── PLANO-TESTES-API.md    # Plano de testes de API
│   ├── ANALISE-BUGS.md        # Análise de bugs encontrados
│   ├── ANALISE-RISCOS.md      # Análise de riscos
│   └── MELHORIAS.md           # Sugestões de melhorias
│
├── playwright.config.js       # Configuração do Playwright
├── package.json               # Dependências do projeto
├── .gitignore                 # Arquivos ignorados
└── README.md                  # Este arquivo
```

---

## 📦 Requisitos

- **Node.js**: v16.0.0 ou superior
- **npm**: v8.0.0 ou superior
- **Navegadores**: Chrome, Firefox, Safari

### Dependências Principais

```json
{
  "@playwright/test": "^1.40.0",  
  "axios": "^1.6.0",               
  "dotenv": "^16.3.1"              
}
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <URL-DO-SEU-REPOSITORIO>
cd betalent-qa-test
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Verifique a instalação

```bash
npx playwright --version
node --version
npm --version
```

---

## 🧪 Execução dos Testes

### Testes de UI (Sauce Demo)

#### Executar todos os testes de UI
```bash
npm run test:ui
```

#### Executar testes de UI com interface visual (headed mode)
```bash
npm run test:ui:headed
```

#### Executar testes de UI em modo debug
```bash
npm run test:ui:debug
```

#### Executar apenas no Chrome
```bash
npm run test:ui:chrome
```

#### Ver relatório HTML dos testes
```bash
npm run report
```

### Testes de API (Restful-Booker)

#### Executar todos os testes de API
```bash
npm run test:api
```

#### Executar com relatório JSON
```bash
node api-testing/tests/runner.js
```

### Executar Todos os Testes

```bash
npm run test:all
```

---

## 📊 Documentação

Toda a documentação do projeto está disponível na pasta `docs/`:

### UI Testing
| Documento | Descrição |
|-----------|-----------|
| `PLANO-TESTES-UI.md` | Casos de teste detalhados, pré-requisitos e resultados esperados |
| `ANALISE-BUGS.md` | 13 bugs identificados com severidade e passos de reprodução |
| `ANALISE-RISCOS.md` | 10 riscos mapeados com probabilidade, impacto e mitigação |
| `MELHORIAS.md` | 12 sugestões de melhorias para a aplicação |

### API Testing
| Documento | Descrição |
|-----------|-----------|
| `PLANO-TESTES-API.md` | Endpoints testados, структура de requests e validações |
| `ANALISE-BUGS.md` | Bugs encontrados na API |

### Documentação Extra
- Collection Postman: `api-testing/collections/Restful-Booker.postman_collection.json`
- Variáveis de Ambiente: `api-testing/environment/Restful-Booker.postman_environment.json`

---

## 🛠️ Stack

- **Playwright** (UI) + **Axios** (API)
- **Node.js** + **JavaScript**
- **Postman** (collections)
- **Markdown** (documentação)

---

## 📈 Cobertura de Testes

### UI Testing - Sauce Demo

| Funcionalidade | Nível 1 | Nível 2 | Total |
|---|:---:|:---:|:---:|
| Autenticação | 6 | 4 | 10 |
| Produtos | 8 | 4 | 12 |
| Carrinho | 7 | 3 | 10 |
| Checkout | 7 | 4 | 11 |
| Navegação | 5 | 5 | 10 |
| **Total** | **33** | **20** | **53** |

### API Testing - Restful-Booker

| Funcionalidade | Testes |
|---|:---:|
| Autenticação | 1 |
| CRUD Operations | 6 |
| Validações | 3 |
| Filtros e Buscas | 3 |
| Health Check | 1 |
| Segurança | 1 |
| Performance | 1 |
| **Total** | **16** |

**Total de Testes: 69 (53 UI + 16 API)**

---

## 📝 Padrões

- Nomenclatura: `TC-[MÓDULO]-[NÚMERO]` (ex: TC-LOGIN-001)
- Page Object Model para UI tests

---

---

## 🔧 Problemas Comuns e Soluções

| Problema | Solução |
|----------|---------|
| Elemento não encontrado | Verificar seletor CSS e esperar carregamento |
| Timeout nos testes | Ajustar timeout no playwright.config.js |
| Erro na API | Verificar credenciais e disponibilidade |
| Certificado SSL | Usar variável `NODE_TLS_REJECT_UNAUTHORIZED=0` |

---

---

## 📅 Projeto Concluído

**Data de Entrega**: 12 de Maio de 2026

### Estatísticas Finais
- **Testes de UI**: 53 (100% passando)
- **Testes de API**: 16 (14 passando, 2 bugs da própria API)
- **Total de Testes**: 69
- **Documentação**: 5 arquivos Markdown
- **Evidências**: 54 screenshots

**Status**: ✅ Projeto concluído
