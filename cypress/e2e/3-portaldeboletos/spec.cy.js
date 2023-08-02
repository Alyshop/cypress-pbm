describe('template spec', () => {
  it('passes', () => {
    cy.intercept('https://portaldeboletos.com.br/adm?ctr=cedentes&mt=index').as('empresas');
    cy.visit('portaldeboletos.com.br/adm')
    cy.get('[name="txt_usuario"]').type('alysson.alves')
    cy.get('[name="txt_senha"]').type(Cypress.env('password'))
    cy.get('#acessar1').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });    
    cy.get('a[href="?ctr=cedentes&mt=index"]').click();
    cy.wait('@empresas');
    cy.get('[onclick="simular(38)"]').click();
    cy.get('[onclick="msgSuccessClose()"]').click();
    cy.get('a[href="?ctr=boletos&mt=index"]').click();
    cy.get('#filtros_situacao').select('Registrado');
    cy.get('#btnPesquisar').click();
    cy.get('#lista_boletos > tr:nth-child(1) > td:nth-child(2) > a').invoke('removeAttr', 'target').click();
    cy.get('[onclick="gerarBoleto()"]').click();

  })
})