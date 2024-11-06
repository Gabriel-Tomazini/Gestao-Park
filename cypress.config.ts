import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implemente os listeners de eventos do nó aqui
    },
    baseUrl: "http://localhost:3000", // Defina a URL base do seu aplicativo
  },
});

