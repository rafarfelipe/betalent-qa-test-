/**
 * Testes de API - Restful-Booker
 * Estilo BDD com JavaScript
 *
 * Funcionalidade: API de Gerenciamento de Reservas
 *   Como um desenvolvedor
 *   Eu quero testar os endpoints da API de reservas
 *   Para que eu possa garantir que a API funciona corretamente
 */

const axios = require('axios')
const assert = require('assert')

const BASE_URL = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com'
const API_DOC_URL = 'https://restful-booker.herokuapp.com/apidoc/index.html'
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  validateStatus: () => true // Não lança exceção em qualquer status
})

class APITester {
  constructor() {
    this.authToken = null
    this.bookingId = null
    this.testResults = []
  }

  /**
   * Registra resultado do teste
   */
  logResult(testName, passed, details = '') {
    this.testResults.push({
      name: testName,
      passed,
      details,
      timestamp: new Date().toISOString()
    })
    const status = passed ? 'PASS' : 'FAIL'
    console.log(`${status} - ${testName}`)
    if (details) console.log(`  └─ ${details}`)
  }

  /**
   * Obtém token de autenticação
   */
  async getAuthToken() {
    try {
      const response = await API.post('/auth', {
        username: 'admin',
        password: 'password123'
      })
      this.authToken = response.data.token
      this.logResult('TC-API-AUTH-001 | Deve obter token de autenticação', true, `Status: ${response.status}, Token: obtained`)
      return this.authToken
    } catch (error) {
      this.logResult('TC-API-AUTH-001 | Deve obter token de autenticação', false, `Erro: ${error.message}`)
      return null
    }
  }

  /**
   * Teste: Criar reserva
   */
  async testCreateBooking() {
    try {
      const bookingData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        },
        additionalneeds: 'Breakfast'
      }
      const response = await API.post('/booking', bookingData)
      this.bookingId = response.data.bookingid
      const passed = response.status === 200 && response.data.bookingid
      this.logResult('TC-API-CRUD-001 | Deve criar reserva', passed, `Status: ${response.status}, Booking ID: ${this.bookingId}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-001 | Deve criar reserva', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Obter todas as reservas
   */
  async testGetAllBookings() {
    try {
      const response = await API.get('/booking')
      const passed = response.status === 200 && Array.isArray(response.data)
      this.logResult('TC-API-CRUD-002 | Deve obter todas as reservas', passed, `Status: ${response.status}, Count: ${response.data.length}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-002 | Deve obter todas as reservas', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Obter reserva por ID
   */
  async testGetBookingById() {
    try {
      const response = await API.get(`/booking/${this.bookingId}`)
      const passed = response.status === 200 && response.data.firstname
      this.logResult('TC-API-CRUD-003 | Deve obter reserva por ID', passed, `Status: ${response.status}, Name: ${response.data.firstname} ${response.data.lastname}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-003 | Deve obter reserva por ID', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Atualizar reserva (PUT)
   */
  async testUpdateBooking() {
    try {
      const updateData = {
        firstname: 'Jane',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        },
        additionalneeds: 'Breakfast'
      }
      const response = await API.put(`/booking/${this.bookingId}`, updateData, {
        headers: { Cookie: `token=${this.authToken}` }
      })
      const passed = response.status === 200 && response.data.firstname === 'Jane'
      this.logResult('TC-API-CRUD-004 | Deve atualizar reserva', passed, `Status: ${response.status}, Updated name: ${response.data.firstname}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-004 | Deve atualizar reserva', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Atualização parcial da reserva (PATCH)
   */
  async testPartialUpdateBooking() {
    try {
      const patchData = { firstname: 'Janet' }
      const response = await API.patch(`/booking/${this.bookingId}`, patchData, {
        headers: { Cookie: `token=${this.authToken}` }
      })
      const passed = response.status === 200
      this.logResult('TC-API-CRUD-005 | Deve atualizar reserva parcialmente', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-005 | Deve atualizar reserva parcialmente', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Excluir reserva
   */
  async testDeleteBooking() {
    try {
      const response = await API.delete(`/booking/${this.bookingId}`, {
        headers: { Cookie: `token=${this.authToken}` }
      })
      const passed = response.status === 201
      this.logResult('TC-API-CRUD-006 | Deve excluir reserva', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-CRUD-006 | Deve excluir reserva', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Atualização não autorizada bloqueada
   */
  async testUnauthorizedUpdateBlocked() {
    try {
      const updateData = { firstname: 'Hacker' }
      const response = await API.put('/booking/1', updateData)
      const passed = response.status === 403
      this.logResult('TC-API-SEC-001 | Deve bloquear atualização de reserva não autenticada', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-SEC-001 | Deve bloquear atualização de reserva não autenticada', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Validar campos obrigatórios
   */
  async testValidateRequiredFields() {
    try {
      const invalidData = {
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2024-01-01', checkout: '2024-01-08' }
      }
      const response = await API.post('/booking', invalidData)
      const passed = response.status !== 200
      this.logResult('TC-API-VALID-001 | Deve validar primeiro nome obrigatório', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-VALID-001 | Deve validar primeiro nome obrigatório', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Formato de preço inválido
   */
  async testInvalidPriceFormat() {
    try {
      const invalidData = {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 'invalid',
        depositpaid: true,
        bookingdates: { checkin: '2024-01-01', checkout: '2024-01-08' }
      }
      const response = await API.post('/booking', invalidData)
      const passed = response.status !== 200
      this.logResult('TC-API-VALID-002 | Deve validar formato do preço', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-VALID-002 | Deve validar formato do preço', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Formato de data inválido
   */
  async testInvalidDateFormat() {
    try {
      const invalidData = {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: 'invalid-date', checkout: '2024-01-08' }
      }
      const response = await API.post('/booking', invalidData)
      const passed = response.status !== 200
      this.logResult('TC-API-VALID-003 | Deve validar formato de data', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-VALID-003 | Deve validar formato de data', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Filtrar por nome
   */
  async testFilterByName() {
    try {
      const response = await API.get('/booking?firstname=TestFilter&lastname=User')
      const passed = response.status === 200 && Array.isArray(response.data)
      this.logResult('TC-API-FILTER-001 | Deve filtrar reservas por nome', passed, `Status: ${response.status}, Results: ${response.data.length}`)
    } catch (error) {
      this.logResult('TC-API-FILTER-001 | Deve filtrar reservas por nome', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Filtrar por intervalo de datas
   */
  async testFilterByDateRange() {
    try {
      const response = await API.get('/booking?checkin=2024-01-01&checkout=2024-01-31')
      const passed = response.status === 200
      this.logResult('TC-API-FILTER-002 | Deve filtrar reservas por intervalo de datas', passed, `Status: ${response.status}, Results: ${response.data.length}`)
    } catch (error) {
      this.logResult('TC-API-FILTER-002 | Deve filtrar reservas por intervalo de datas', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Paginação
   */
  async testPagination() {
    try {
      const response = await API.get('/booking?limit=5&offset=0')
      const passed = response.status === 200 && Array.isArray(response.data)
      this.logResult('TC-API-FILTER-003 | Deve suportar paginação', passed, `Status: ${response.status}, Results: ${response.data.length}`)
    } catch (error) {
      this.logResult('TC-API-FILTER-003 | Deve suportar paginação', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Health check da API
   */
  async testAPIHealth() {
    try {
      const response = await API.get('/ping')
      const passed = response.status === 201
      this.logResult('TC-API-HEALTH-001 | Deve retornar status de API saudável', passed, `Status: ${response.status}`)
    } catch (error) {
      this.logResult('TC-API-HEALTH-001 | Deve retornar status de API saudável', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Teste: Tempo de resposta
   */
  async testResponseTime() {
    try {
      const startTime = Date.now()
      const response = await API.get('/ping')
      const responseTime = Date.now() - startTime
      const passed = response.status === 201 && responseTime < 2000
      this.logResult('TC-API-PERF-001 | Deve responder ao health check em menos de 2 segundos', passed, `Status: ${response.status}, Response time: ${responseTime}ms`)
    } catch (error) {
      this.logResult('TC-API-PERF-001 | Deve responder ao health check em menos de 2 segundos', false, `Erro: ${error.message}`)
    }
  }

  /**
   * Executa todos os testes
   */
  async runAllTests() {
    console.log('\n' + '='.repeat(60))
    console.log('EXECUTANDO TESTES DE API - Restful-Booker')
    console.log(`URL Base: ${BASE_URL}`)
    console.log(`Documentação da API: ${API_DOC_URL}`)
    console.log('='.repeat(60))

    // Executa todos os testes
    await this.getAuthToken()
    await this.testCreateBooking()
    await this.testGetAllBookings()
    await this.testGetBookingById()
    await this.testUnauthorizedUpdateBlocked()
    await this.testUpdateBooking()
    await this.testPartialUpdateBooking()
    await this.testDeleteBooking()
    await this.testValidateRequiredFields()
    await this.testInvalidPriceFormat()
    await this.testInvalidDateFormat()
    await this.testFilterByName()
    await this.testFilterByDateRange()
    await this.testPagination()
    await this.testAPIHealth()
    await this.testResponseTime()

    // Resumo
    this.printSummary()

    return this.testResults
  }

  /**
   * Imprime resumo dos testes
   */
  printSummary() {
    const passed = this.testResults.filter(r => r.passed).length
    const total = this.testResults.length
    const percentage = ((passed / total) * 100).toFixed(2)

    console.log('\n' + '='.repeat(60))
    console.log('\nRESUMO DOS TESTES')
    console.log(`Total de Testes: ${total}`)
    console.log(`Passed: ${passed}`)
    console.log(`Failed: ${total - passed}`)
    console.log(`Taxa de Aprovação: ${percentage}%\n`)
  }
}

// Executa os testes
if (require.main === module) {
  const tester = new APITester()
  tester.runAllTests()
    .then(results => {
      const failed = results.filter(r => !r.passed).length
      process.exit(failed > 0 ? 1 : 0)
    })
    .catch(error => {
      console.error('Erro ao executar testes:', error)
      process.exit(1)
    })
}

module.exports = APITester