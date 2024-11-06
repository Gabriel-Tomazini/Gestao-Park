import { defineConfig, ConfigOptions } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ) {
      // Implementar os listeners de eventos do nó aqui
    },
    baseUrl: "http://localhost:3000", // Defina a URL base do seu aplicativo
  },
});

