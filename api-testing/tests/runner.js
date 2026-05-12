/**
 * API Test Runner
 * Executa todos os testes de API e gera relatório
 */

const APITester = require('./api-tests')
const fs = require('fs')
const path = require('path')

async function runTests() {
  const tester = new APITester()
  const results = await tester.runAllTests()

  // Gerar relatório
  const report = {
    title: 'Restful-Booker API Test Report',
    baseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    apiDocumentation: 'https://restful-booker.herokuapp.com/apidoc/index.html',
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passedTests: results.filter(r => r.passed).length,
    failedTests: results.filter(r => !r.passed).length,
    passRate: `${((results.filter(r => r.passed).length / results.length) * 100).toFixed(2)}%`,
    results: results
  }

  // Salvar relatório em arquivo
  const reportPath = path.join(__dirname, '../evidencia', 'api-test-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\nRelatorio salvo em: ${reportPath}`)

  return report
}

runTests().catch(error => {
  console.error('Erro ao executar testes:', error)
  process.exit(1)
})