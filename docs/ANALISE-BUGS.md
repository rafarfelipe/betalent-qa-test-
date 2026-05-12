# 🐛 Análise de Bugs Encontrados

## Sumário Executivo

Durante a execução dos testes de UI e API, foram identificados os seguintes bugs:

- **Total de Bugs**: 13
- **Críticos**: 2
- **Altos**: 6
- **Médios**: 4
- **Baixos**: 1

**Status Geral**: ✅ Aplicação funcional com melhorias necessárias

---

## Bugs UI - Sauce Demo

### 🔴 BUG-UI-001 | Performance Glitch - Tempo de Carregamento Excessivo

**Severidade**: 🔴 CRÍTICA (P0)

**Componente**: Login Page

**Descrição**: 
O usuário `performance_glitch_user` experimenta atrasos significativos ao fazer login. A página de produtos demora aproximadamente 5-10 segundos para carregar.

**Passos para Reproduzir**:
1. Navegar para https://www.saucedemo.com
2. Inserir username: `performance_glitch_user`
3. Inserir password: `secret_sauce`
4. Observar tempo de carregamento da página de produtos

**Resultado Atual**: 
Página demora 5-10 segundos para carregar

**Resultado Esperado**: 
Página deve carregar em menos de 2 segundos

**Impacto**:
- Experiência do usuário prejudicada
- Possível abandono de sessão
- Usuários podem pensar que a página travou

**Prioridade do Fix**: Alta

**Status**: ⚠️ NÃO RESOLVIDO (por design da aplicação)

**Notas**: 
Este é um comportamento intencional do Sauce Demo para demonstrar problemas de performance.

---

### 🔴 BUG-UI-002 | Problema do Usuário - Imagens com Aspecto Visual Incorreto

**Severidade**: 🔴 CRÍTICA (P0)

**Componente**: Products Page

**Descrição**: 
O usuário `problem_user` vê imagens dos produtos com distorções visuais. Algumas imagens aparecem invertidas ou com sobreposição de conteúdo.

**Passos para Reproduzir**:
1. Fazer login com `problem_user` / `secret_sauce`
2. Navegar para página de produtos
3. Observar imagens dos produtos

**Resultado Atual**: 
Imagens aparecem distorcidas ou com problemas visuais

**Resultado Esperado**: 
Imagens devem exibir corretamente e ser legíveis

**Impacto**:
- Usuário não consegue ver os produtos corretamente
- Confiança no site diminui
- Possível aumento de rejeição da página

**Prioridade do Fix**: Crítica

**Status**: ⚠️ CONHECIDO (por design)

**Notas**: 
Este é um comportamento intencional do Sauce Demo.

---

### 🟠 BUG-UI-003 | Carrinho Não Persiste Após Logout

**Severidade**: 🟠 ALTA (P1)

**Componente**: Cart / Session Management

**Descrição**: 
Quando um usuário faz logout e login novamente, o carrinho é limpo. Isso é esperado em algumas aplicações, mas pode ser considerado um problema dependendo dos requisitos.

**Passos para Reproduzir**:
1. Fazer login
2. Adicionar produtos ao carrinho
3. Fazer logout
4. Fazer login novamente
5. Verificar carrinho

**Resultado Atual**: 
Carrinho está vazio após logout

**Resultado Esperado**: 
Carrinho deve persistir (depende dos requisitos de negócio)

**Impacto**:
- Experiência do usuário pode ser prejudicada
- Carrinhos perdidos em caso de desconexão

**Prioridade do Fix**: Média

**Status**: ℹ️ VERIFICAR REQUISITOS

---

### 🟠 BUG-UI-004 | Campo de Postal Code Aceita Valores Inválidos

**Severidade**: 🟠 ALTA (P1)

**Componente**: Checkout Form

**Descrição**: 
O campo de Postal Code aceita qualquer valor, inclusive valores não numéricos ou muito curtos. Não há validação de formato.

**Passos para Reproduzir**:
1. Adicionar produto ao carrinho
2. Ir para checkout
3. Preencher formulário com postal code: "ABC" ou "1"
4. Clicar Continue
5. Observar que é aceito

**Resultado Atual**: 
Aplicação aceita qualquer valor

**Resultado Esperado**: 
Deve validar formato (ex: 5 dígitos mínimo)

**Impacto**:
- Dados de entrega inválidos podem ser salvos
- Problemas de entrega para clientes
- Falha de validação de dados

**Prioridade do Fix**: Alta

**Status**: 🔴 NÃO RESOLVIDO

**Sugestão de Fix**: 
Adicionar validação regex no frontend: `/^\d{5,}$/`

---

### 🟠 BUG-UI-005 | Sem Confirmação de Ação ao Remover Produto

**Severidade**: 🟠 ALTA (P1)

**Componente**: Cart / Products Page

**Descrição**: 
Ao remover um produto do carrinho, não há confirmação. Usuários podem remover acidentalmente sem aviso.

**Passos para Reproduzir**:
1. Adicionar produto ao carrinho
2. Ver carrinho
3. Clicar Remove

**Resultado Atual**: 
Produto removido imediatamente sem confirmação

**Resultado Esperado**: 
Modal de confirmação deve aparecer (opcional)

**Impacto**:
- Cliques acidentais removem produtos
- Frustração do usuário

**Prioridade do Fix**: Média

**Status**: ℹ️ CONSIDERAR

---

### 🟡 BUG-UI-006 | Sorter Não Mantém Estado ao Navegar

**Severidade**: 🟡 MÉDIA (P2)

**Componente**: Products Filter

**Descrição**: 
Ao selecionar um filtro de ordenação e depois navegar para carrinho e voltar, a ordenação volta ao padrão.

**Passos para Reproduzir**:
1. Ordenar produtos por "Price (High to Low)"
2. Ir para carrinho
3. Voltar aos produtos

**Resultado Atual**: 
Produtos voltam à ordenação padrão

**Resultado Esperado**: 
Ordenação deve ser mantida ou persistida

**Impacto**:
- Experiência do usuário degradada
- Usuário precisa reordenar

**Prioridade do Fix**: Média

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟡 BUG-UI-007 | Footer Não é Visível em Mobile

**Severidade**: 🟡 MÉDIA (P2)

**Componente**: Footer / Responsive Design

**Descrição**: 
Em viewports mobile, o footer não é visível ou está cortado.

**Passos para Reproduzir**:
1. Definir viewport para 375x667 (mobile)
2. Scroll até o final da página
3. Observar footer

**Resultado Atual**: 
Footer não é visível ou está parcialmente cortado

**Resultado Esperado**: 
Footer deve ser totalmente visível em todos os viewports

**Impacto**:
- Usuários mobile não conseguem acessar links do footer
- Links de redes sociais não acessíveis
- Possível problema de acessibilidade

**Prioridade do Fix**: Média

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟢 BUG-UI-008 | Mensagem de Erro Genérica

**Severidade**: 🟢 BAIXA (P3)

**Componente**: Autenticação

**Descrição**: 
Mensagem de erro ao fazer login é muito genérica: "Username and password do not match any user". Não indica se foi username ou password que está errado.

**Resultado Atual**: 
Mensagem genérica

**Resultado Esperado**: 
Mensagem mais específica (ex: "Username not found" ou "Incorrect password")

**Impacto**:
- Usuário fica confuso
- Não sabe se digita username ou password errado
- Potencial risco de segurança (revelação de informações)

**Prioridade do Fix**: Baixa

**Status**: ℹ️ CONSIDERAR

---

## Bugs API - Restful-Booker

### 🟠 BUG-API-001 | Sem Validação de Email no Campo Additionalneeds

**Severidade**: 🟠 ALTA (P1)

**Endpoint**: POST /booking

**Descrição**: 
O campo `additionalneeds` aceita qualquer valor, inclusive valores muito grandes ou malformados.

**Request**:
```json
{
  "firstname": "Test",
  "lastname": "User",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2024-01-01",
    "checkout": "2024-01-08"
  },
  "additionalneeds": "A" * 10000
}
```

**Resultado Atual**: 
API aceita valores muito grandes

**Resultado Esperado**: 
Deve haver limite de caracteres (ex: 500)

**Impacto**:
- Injeção de dados problemáticos
- Possível DoS com strings muito grandes
- Integridade de dados comprometida

**Prioridade do Fix**: Alta

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟠 BUG-API-002 | Sem Validação de Datas (Checkout Antes de Checkin)

**Severidade**: 🟠 ALTA (P1)

**Endpoint**: POST /booking

**Descrição**: 
API aceita checkout em data anterior ao checkin.

**Request**:
```json
{
  "firstname": "Test",
  "lastname": "User",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2024-01-08",
    "checkout": "2024-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

**Resultado Atual**: 
API cria a reserva com datas inválidas

**Resultado Esperado**: 
API deve rejeitar com erro 400

**Impacto**:
- Reservas inválidas no sistema
- Problemas de negócio
- Integridade de dados

**Prioridade do Fix**: Crítica

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟡 BUG-API-003 | Sem Limite de Taxa (Rate Limiting)

**Severidade**: 🟡 MÉDIA (P2)

**Endpoint**: Todos

**Descrição**: 
API não tem rate limiting. Um client pode fazer ilimitadas requisições.

**Impacto**:
- Vulnerabilidade a DoS
- Consumo excessivo de recursos
- Degradação de performance

**Prioridade do Fix**: Média

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟡 BUG-API-004 | Token Não Expira

**Severidade**: 🟡 MÉDIA (P2)

**Endpoint**: POST /auth

**Descrição**: 
Token gerado não tem data de expiração.

**Impacto**:
- Risco de segurança
- Token pode ser reutilizado indefinidamente
- Violação de boas práticas de segurança

**Prioridade do Fix**: Média

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟡 BUG-API-005 | Paginação Sem Ordem Consistente

**Severidade**: 🟡 MÉDIA (P2)

**Endpoint**: GET /booking?limit=5&offset=0

**Descrição**: 
Paginação não retorna resultados em ordem consistente.

**Impacto**:
- Duplicação de resultados entre páginas
- Perda de resultados
- Experiência confusa para usuário

**Prioridade do Fix**: Média

**Status**: 🔴 NÃO RESOLVIDO

---

### 🟠 BUG-API-006 | Totalprice Aceita Valor Não Numérico

**Severidade**: 🟠 ALTA (P1)

**Endpoint**: POST /booking

**Descrição**:
Durante a execução em `https://restful-booker.herokuapp.com`, a API aceitou `totalprice` como string inválida e retornou status `200`.

**Resultado Atual**:
API cria a reserva mesmo quando `totalprice` não é numérico.

**Resultado Esperado**:
API deve rejeitar o request com erro 400 ou normalizar o valor de forma explícita e documentada.

**Status**: 🔴 NÃO RESOLVIDO

---

## Sumário de Bugs por Componente

| Componente | Críticos | Altos | Médios | Baixos |
|-----------|----------|-------|--------|--------|
| Autenticação | 0 | 0 | 0 | 1 |
| Products | 1 | 1 | 1 | 0 |
| Cart | 0 | 1 | 1 | 0 |
| Checkout | 0 | 1 | 0 | 0 |
| Responsividade | 0 | 0 | 1 | 0 |
| API - Booking | 2 | 3 | 3 | 0 |
| **TOTAL** | **3** | **6** | **6** | **1** |

---

## Recomendações

### Curto Prazo (Sprint Atual)
1. Implementar validação de Postal Code no frontend
2. Adicionar validação de datas (checkout > checkin) na API
3. Implementar limite de caracteres em additionalneeds

### Médio Prazo (Próximos 2-3 Sprints)
1. Implementar rate limiting na API
2. Adicionar token expiration
3. Corrigir paginação para ordem consistente
4. Melhorar mensagens de erro

### Longo Prazo
1. Implementar confirmação para ações destrutivas
2. Persistir estado de filtros/ordenação
3. Melhorar responsividade em mobile
4. Implementar testes de segurança

---

## Conclusão

A aplicação é funcional, mas tem alguns bugs importantes que devem ser corrigidos, especialmente os relacionados a validação de dados. Os bugs conhecidos do Sauce Demo são propositais para demonstração.

A prioridade deve ser:
1. **Crítica**: Validação de datas na API
2. **Alta**: Validação de formato de Postal Code
3. **Alta**: Limite de caracteres em additionalneeds
4. **Média**: Rate limiting e token expiration
