export default {
  e2e: {
    setupNodeEvents(on, config) {
      // Implemente os listeners de eventos do nó aqui
    },
    baseUrl: 'http://localhost:3000', // Defina a URL base do seu aplicativo
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Padrão para os arquivos de teste
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}', // Arquivo de suporte para testes
  },
};
