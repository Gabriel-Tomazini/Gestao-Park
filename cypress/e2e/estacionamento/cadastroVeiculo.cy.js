/// <reference types="cypress" />

describe("CadastroForm Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cadastrarCarro"); // Exemplo se a página de cadastro estiver em /cadastrarCarro
  });

  it("Deve mostrar erro se a placa tiver menos de 7 caracteres", () => {
    cy.get('input[placeholder="Placa"]').type("ABC123");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12345");
    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("A placa deve ter exatamente 7 caracteres.");
    });
  });

  it("Deve realizar o cadastro com placa válida e mostrar mensagem de sucesso", () => {
    cy.get('input[placeholder="Placa"]').type("ABC1234");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12345");

    cy.intercept("POST", "/api/cadastroCarro", {
      statusCode: 200,
      body: { success: true },
    }).as("postCadastro");

    cy.get('button[type="submit"]').click();
    cy.wait("@postCadastro").then(() => {
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal("Cadastro realizado com sucesso!");
      });
    });
  });

  it("Deve mostrar erro se o cadastro falhar", () => {
    cy.get('input[placeholder="Placa"]').type("ABC1234");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12345");

    cy.intercept("POST", "/api/cadastroCarro", {
      statusCode: 500,
      body: { success: false },
    }).as("postCadastroError");

    cy.get('button[type="submit"]').click();
    cy.wait("@postCadastroError").then(() => {
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal(
          "Erro ao realizar o cadastro. Tente novamente.",
        );
      });
    });
  });
});
