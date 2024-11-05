/// <reference types="cypress" />

describe("CadastroForm Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cadastrarCarro"); // Certifique-se de que este caminho está correto
  });

  it("Deve realizar o cadastro com placa válida e mostrar mensagem de sucesso", () => {
    cy.intercept("POST", "http://localhost:3000/api/cadastroCarro", {
      statusCode: 200,
      body: { success: true },
    }).as("postCadastro");

    // Preenche os campos do formulário
    cy.get('input[placeholder="Placa"]').type("ABC1234");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="Cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12");

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Espera pela resposta da API e verifica a mensagem de sucesso
    cy.wait("@postCadastro").then(() => {
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal("Cadastro realizado com sucesso!");
      });
    });
  });

  it("Deve mostrar erro se a placa tiver menos de 7 caracteres", () => {
    // Preenche os campos do formulário
    cy.get('input[placeholder="Placa"]').type("ABC123");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="Cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12345");

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Verifica a mensagem de erro
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("A placa deve ter exatamente 7 caracteres.");
    });
  });

  it("Deve mostrar erro se o cadastro falhar", () => {
    cy.intercept("POST", "http://localhost:3000/api/cadastroCarro", {
      statusCode: 500,
      body: { success: false },
    }).as("postCadastroError");

    // Preenche os campos do formulário
    cy.get('input[placeholder="Placa"]').type("ABC1234");
    cy.get('input[placeholder="Modelo"]').type("Carro Teste");
    cy.get('input[placeholder="Cor"]').type("Azul");
    cy.get('input[placeholder="Código do dono"]').type("12345");

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Espera pela resposta da API e verifica a mensagem de erro
    cy.wait("@postCadastroError").then(() => {
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal(
          "Erro ao realizar o cadastro. Tente novamente.",
        );
      });
    });
  });
});
