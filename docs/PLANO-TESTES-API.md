# 🔌 Plano de Testes de API - Restful-Booker

## 1. Visão Geral

Este documento detalha o plano completo de testes para a API Restful-Booker, um serviço de reserva de hotéis utilizado para validar funcionalidades de uma API REST.

**URL da API**: https://restful-booker.herokuapp.com

**Documentação oficial usada como referência**: https://restful-booker.herokuapp.com/apidoc/index.html

Todos os testes de API deste desafio devem usar a Restful-Booker. O código usa `API_BASE_URL` quando informado; caso contrário, usa `https://restful-booker.herokuapp.com`.

**Versão da API**: v1

**Data de Criação**: 11 de Maio de 2026

---

## 2. Objetivo dos Testes

Validar as principais funcionalidades da API Restful-Booker, incluindo:
- Autenticação e geração de tokens
- CRUD completo de reservas (Create, Read, Update, Delete)
- Filtros e buscas avançadas
- Paginação
- Validação de campos obrigatórios
- Tratamento de erros
- Health check da API

---

## 3. Escopo dos Testes

### ✅ Incluído
- Autenticação básica (POST /auth)
- Criar reservas (POST /booking)
- Listar todas as reservas (GET /booking)
- Obter reserva específica (GET /booking/{id})
- Atualizar reserva completa (PUT /booking/{id})
- Atualizar reserva parcial (PATCH /booking/{id})
- Deletar reserva (DELETE /booking/{id})
- Filtrar por nome (GET /booking?firstname=...&lastname=...)
- Filtrar por datas (GET /booking?checkin=...&checkout=...)
- Paginação (GET /booking?limit=...&offset=...)
- Validação de campos
- Health check (GET /ping)

### ❌ Excluído
- Testes de performance/carga
- Testes de segurança avançados (penetration testing)
- Testes de integração com banco de dados
- Testes de timeout/retry logic customizada

---

## 4. Tipos de Testes

### 4.1 Autenticação

#### TC-API-AUTH-001 | Obter Token de Autenticação
- **Endpoint**: POST /auth
- **Objetivo**: Validar geração de token de autenticação
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response contém propriedade `token`
  - ✅ Token é uma string não-vazia
  - ✅ Token pode ser usado em requisições subsequentes
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

**Exemplo de Response**:
```json
{
  "token": "d94d2fe91f36a29f"
}
```

---

### 4.2 Operações CRUD

#### TC-API-CRUD-001 | Criar Nova Reserva
- **Endpoint**: POST /booking
- **Objetivo**: Validar criação de nova reserva
- **Request Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-01-01",
      "checkout": "2024-01-08"
    },
    "additionalneeds": "Breakfast"
  }
  ```
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response contém `bookingid`
  - ✅ Response contém objeto `booking` com dados enviados
  - ✅ `bookingid` é número positivo
  - ✅ `firstname` é "John"
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

**Exemplo de Response**:
```json
{
  "bookingid": 1234,
  "booking": {
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-01-01",
      "checkout": "2024-01-08"
    },
    "additionalneeds": "Breakfast"
  }
}
```

#### TC-API-CRUD-002 | Listar Todas as Reservas
- **Endpoint**: GET /booking
- **Objetivo**: Validar listagem de todas as reservas
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response é um array
  - ✅ Array contém mínimo 1 item (ou mais)
  - ✅ Cada item tem propriedade `bookingid`
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

**Exemplo de Response**:
```json
[
  { "bookingid": 1 },
  { "bookingid": 2 },
  { "bookingid": 3 }
]
```

#### TC-API-CRUD-003 | Obter Reserva Específica
- **Endpoint**: GET /booking/{id}
- **Objetivo**: Validar obtenção de reserva pelo ID
- **URL Parameters**: id = ID da reserva criada
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response contém todos os campos da reserva
  - ✅ `firstname`, `lastname`, `totalprice` estão presentes
  - ✅ Dados correspondem à reserva criada
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

**Exemplo de Response**:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2024-01-01",
    "checkout": "2024-01-08"
  },
  "additionalneeds": "Breakfast"
}
```

#### TC-API-CRUD-004 | Atualizar Reserva Completa
- **Endpoint**: PUT /booking/{id}
- **Objetivo**: Validar atualização completa de reserva
- **Headers**: Cookie: token={auth_token}
- **Request Body**:
  ```json
  {
    "firstname": "Jane",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-01-01",
      "checkout": "2024-01-08"
    },
    "additionalneeds": "Breakfast"
  }
  ```
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ `firstname` foi alterado para "Jane"
  - ✅ `totalprice` foi alterado para 150
  - ✅ Todos os campos foram atualizados
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

#### TC-API-CRUD-005 | Atualizar Reserva Parcial (PATCH)
- **Endpoint**: PATCH /booking/{id}
- **Objetivo**: Validar atualização parcial de reserva
- **Headers**: Cookie: token={auth_token}
- **Request Body**:
  ```json
  {
    "firstname": "Janet"
  }
  ```
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Apenas `firstname` foi alterado
  - ✅ Outros campos permanecem inalterados
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-CRUD-006 | Deletar Reserva
- **Endpoint**: DELETE /booking/{id}
- **Objetivo**: Validar exclusão de reserva
- **Headers**: Cookie: token={auth_token}
- **Resultado Esperado**:
  - ✅ Status Code: 201
  - ✅ Reserva é removida
  - ✅ Tentativa de GET posterior retorna 404
- **Prioridade**: P0 (Crítica)
- **Status**: ✅ Implementado

---

### 4.3 Validação de Campos

#### TC-API-VALID-001 | Validar Campo Firstname Obrigatório
- **Objetivo**: Validar que firstname é obrigatório
- **Teste**: Enviar POST /booking sem firstname
- **Resultado Esperado**:
  - ✅ Status Code: não 200 (erro)
  - ✅ Ou API cria com valor padrão
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-VALID-002 | Validar Formato de Preço
- **Objetivo**: Validar que totalprice é numérico
- **Teste**: Enviar totalprice = "invalid"
- **Resultado Esperado**:
  - ✅ Status Code: não 200 (erro)
  - ✅ Ou API converte para número válido
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-VALID-003 | Validar Formato de Data
- **Objetivo**: Validar que datas estão em formato correto (YYYY-MM-DD)
- **Teste**: Enviar checkin = "invalid-date"
- **Resultado Esperado**:
  - ✅ Status Code: não 200 (erro)
  - ✅ Message de erro clara
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-VALID-004 | Validar Depositpaid Boolean
- **Objetivo**: Validar que depositpaid é boolean
- **Teste**: Enviar depositpaid = "yes"
- **Resultado Esperado**:
  - ✅ API converte ou rejeita
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

### 4.4 Filtros e Buscas

#### TC-API-FILTER-001 | Filtrar por Nome
- **Endpoint**: GET /booking?firstname=TestFilter&lastname=User
- **Objetivo**: Validar filtro por primeiro e último nome
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response é um array
  - ✅ Array contém apenas reservas que correspondem ao filtro
  - ✅ Ou array vazio se nenhum resultado
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-FILTER-002 | Filtrar por Data de Check-in
- **Endpoint**: GET /booking?checkin=2024-01-01&checkout=2024-01-31
- **Objetivo**: Validar filtro por intervalo de datas
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response é um array
  - ✅ Apenas reservas no intervalo de datas
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

#### TC-API-FILTER-003 | Paginação de Resultados
- **Endpoint**: GET /booking?limit=5&offset=0
- **Objetivo**: Validar paginação de resultados
- **Query Parameters**:
  - `limit`: Número máximo de resultados (ex: 5)
  - `offset`: Deslocamento inicial (ex: 0)
- **Resultado Esperado**:
  - ✅ Status Code: 200
  - ✅ Response é um array
  - ✅ Array contém máximo `limit` items
  - ✅ Segunda página começa em `offset`
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

---

### 4.5 Health Check

#### TC-API-HEALTH-001 | Verificar Saúde da API
- **Endpoint**: GET /ping
- **Objetivo**: Validar que API está funcionando (health check)
- **Resultado Esperado**:
  - ✅ Status Code: 201
  - ✅ API está operacional
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

**Response**:
```
Ping Created.
```

---

### 4.6 Segurança

#### TC-API-SEC-001 | Bloquear Atualização Sem Autenticação
- **Endpoint**: PUT /booking/{id}
- **Objetivo**: Validar que alteração de reserva exige token
- **Teste**: Enviar PUT sem header `Cookie: token={auth_token}`
- **Resultado Esperado**:
  - ✅ Status Code: 403
  - ✅ Reserva não é alterada
- **Prioridade**: P1 (Alta)
- **Status**: ✅ Implementado

---

### 4.7 Performance

#### TC-API-PERF-001 | Health Check Abaixo de 2 Segundos
- **Endpoint**: GET /ping
- **Objetivo**: Validar resposta básica da API dentro de um tempo aceitável
- **Resultado Esperado**:
  - ✅ Status Code: 201
  - ✅ Tempo de resposta menor que 2000ms
- **Prioridade**: P2 (Média)
- **Status**: ✅ Implementado

---

## 5. Estrutura de Requests e Responses

### Headers Padrão

```
Content-Type: application/json
Accept: application/json
```

### Headers para Requisições Autenticadas

```
Cookie: token={auth_token}
Content-Type: application/json
```

### Resposta de Erro Padrão

```json
{
  "error": "Descrição do erro"
}
```

---

## 6. Dados de Teste

### Credenciais

```
username: admin
password: password123
```

### Dados de Reserva

```json
{
  "firstname": "John/Jane/Alice/Bob",
  "lastname": "Doe/Smith/Johnson/Williams",
  "totalprice": 111-999,
  "depositpaid": true/false,
  "bookingdates": {
    "checkin": "2024-01-01" (YYYY-MM-DD),
    "checkout": "2024-01-08" (YYYY-MM-DD)
  },
  "additionalneeds": "Breakfast/Dinner/Lunch"
}
```

---

## 7. Cenários de Teste

### Scenario 1: Fluxo Completo

1. Obter token de autenticação
2. Criar nova reserva
3. Listar todas as reservas
4. Obter reserva específica
5. Atualizar reserva
6. Deletar reserva

### Scenario 2: Validação de Dados

1. Tentar criar reserva sem firstname
2. Tentar criar reserva com preço inválido
3. Tentar criar reserva com data inválida
4. Verificar mensagens de erro apropriadas

### Scenario 3: Filtros

1. Criar múltiplas reservas
2. Filtrar por nome
3. Filtrar por datas
4. Usar paginação

### Scenario 4: Segurança e Performance

1. Criar uma reserva para teste
2. Tentar atualizar sem token de autenticação
3. Validar bloqueio com status 403
4. Medir tempo de resposta do health check

---

## 8. Critérios de Aceitação

### Implementação

- ✅ Todos os endpoints testados
- ✅ Validações de entrada implementadas
- ✅ Tratamento de erros documentado
- ✅ Testes em BDD style com JavaScript
- ✅ Collection Postman fornecida

### Cobertura

- ✅ 1 teste de autenticação
- ✅ 6 testes CRUD
- ✅ 3 testes de validação
- ✅ 3 testes de filtros
- ✅ 1 teste de health check
- ✅ 1 teste de segurança
- ✅ 1 teste de performance
- **Total: 16 testes**

### Documentação

- ✅ Cada endpoint documentado
- ✅ Request/Response examples
- ✅ Cenários de teste descritos
- ✅ Dados de teste fornecidos

---

## 9. Códigos de Status HTTP Esperados

| Operação | Código | Descrição |
|----------|--------|-----------|
| GET /ping | 201 | Created |
| POST /auth | 200 | OK |
| POST /booking | 200 | OK |
| GET /booking | 200 | OK |
| GET /booking/{id} | 200 | OK |
| PUT /booking/{id} | 200 | OK |
| PATCH /booking/{id} | 200 | OK |
| DELETE /booking/{id} | 201 | Created |
| PUT /booking/{id} sem token | 403 | Forbidden |
| GET /booking (sem resultados) | 200 | OK (array vazio) |

---

## 10. Estrutura de Resposta por Endpoint

### POST /auth
```json
{
  "token": "string"
}
```

### POST /booking
```json
{
  "bookingid": "number",
  "booking": {
    "firstname": "string",
    "lastname": "string",
    "totalprice": "number",
    "depositpaid": "boolean",
    "bookingdates": {
      "checkin": "string (YYYY-MM-DD)",
      "checkout": "string (YYYY-MM-DD)"
    },
    "additionalneeds": "string"
  }
}
```

### GET /booking
```json
[
  {
    "bookingid": "number"
  },
  ...
]
```

### GET /booking/{id}
```json
{
  "firstname": "string",
  "lastname": "string",
  "totalprice": "number",
  "depositpaid": "boolean",
  "bookingdates": {
    "checkin": "string (YYYY-MM-DD)",
    "checkout": "string (YYYY-MM-DD)"
  },
  "additionalneeds": "string"
}
```

---

## 11. Métricas

| Métrica | Valor |
|---------|-------|
| Total de Testes | 16 |
| Endpoints Testados | 8 |
| Cenários de Teste | 4 |
| Cobertura de Funcionalidades | 100% |
| Tempo Estimado de Execução | 2-3 minutos |

---

## 12. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| API indisponível | Baixa | Alto | Usar health check antes dos testes |
| Token expirado | Baixa | Médio | Gerar novo token a cada execução |
| Dados de teste conflitantes | Média | Médio | Usar dados únicos por execução |
| Limite de rate | Baixa | Médio | Adicionar delays entre requisições |
| Dados persistem entre execuções | Média | Médio | Limpar dados após testes |

---

## 13. Conclusão

Este plano de testes fornece cobertura completa dos endpoints da API Restful-Booker, com validações abrangentes e documentação clara. A implementação em JavaScript com padrão BDD garante testes maintíveis e fáceis de entender.

A collection Postman fornecida permite execução manual dos testes, enquanto os scripts JavaScript automatizam toda a suite de testes.

---

## 14. Collection Postman

A collection `Restful-Booker.postman_collection.json` contém:
- ✅ Todos os endpoints
- ✅ Testes automatizados em cada requisição
- ✅ Ambiente com variáveis
- ✅ Exemplos de request/response
- ✅ Documentação inline

### Importar no Postman

1. Abrir Postman
2. Clicar em "Import"
3. Selecionar arquivo `Restful-Booker.postman_collection.json`
4. Importar ambiente `Restful-Booker.postman_environment.json`
5. Executar testes

---

## 15. Execução via JavaScript

Para executar via Node.js:

```bash
npm run test:api
```

Gera relatório em JSON em `api-testing/evidencia/api-test-report.json`
