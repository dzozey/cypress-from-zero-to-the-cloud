/// <reference types="Cypress"/>

describe('TAT Customer Service Center', () => {
  beforeEach( () => {
    cy.visit("./src/index.html")
  })

  it('checks the application title', () => {
    cy.title().should("be.equal", "TAT Customer Service Center")
  })

  it('fills in the required fields and submits the form', () => {
    const text = "Neki random tekst koji treba da bude duzi kako bi upis bio duzi"
    cy.get('#firstName').type('Nenad')
    cy.get('#lastName').type('Dzodic')
    cy.get('#email').type('email@email.com')
    //cy.get('#phone').type('064')
    //cy.get('#product').select('Courses')
    //cy.get('#support-type > :nth-child(3)').click()
    //cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(text, {delay:0}) //delay:0 smanji trajanje testa za sekund
    cy.get('.button').click()
    
    cy.get('.success').should('be.visible')

    cy.get('#phone').type("abc").should('be.empty')  
  })

  it('displays an error message when submitting the form with an email with invalid formatting', () => {
    const text = "Neki random tekst koji treba da bude duzi kako bi upis bio duzi"
    cy.get('#firstName').type('Nenad')
    cy.get('#lastName').type('Dzodic')
    cy.get('#email').type('email.com')
    cy.get('#open-text-area').type(text, {delay:0}) //delay:0 smanji trajanje testa za sekund
    cy.get('.button').click()
    
    cy.get('.error').should('be.visible')
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', ()=> {
    cy.get('#firstName').type('Nenad')
    cy.get('#lastName').type('Dzodic')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('slovca neka') 
    cy.get('#phone-checkbox').click()
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })

  it('fills and clears the first name, last name, email, and phone fields', ()=> {
    cy.get('#firstName')
      .type('Nenad')
      .should('have.value', 'Nenad')
      .clear()
      .should('have.value', "")
    cy.get('#lastName').type('Dzodic')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('slovca neka') 
    cy.get('#phone-checkbox').click()
    //cy.get('.button').click()

    //cy.get('.error').should('be.visible')
  })

  it('successfully submits the form using a custom command', ()=> {
    const data = {
      firstName: "Neny",
      lastName: "Jeny",
      email: "Neny@Jeny.com",
      text: "bla mori bla"
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('selects a product', ()=> {
    cy.get('#product').select('Mentorship').should('have.value', 'mentorship')
  })

  it('checks each type of service', ()=> {
    cy.get('#support-type').find('input[type="radio"]')
  })

  it('checks both checkboxes, then unchecks the last one', ()=> {
    //cy.get('#email-checkbox').check()
    //cy.get('#email-checkbox').uncheck()
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').last().uncheck()
    
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
  })

  it('selects a file from the fixtures folder', ()=> {
    cy.get('input[type="file"')
      .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
      .should('have.length', 1)
  })

  it('verifies that the privacy policy page opens in another tab without the need for a click', ()=> {
    cy.get('a').should('have.attr', 'target', '_blank')
  })

  it('access the privacy policy page by removing the target, then clicking on the link', ()=> {
    cy.get('a').invoke('removeAttr', 'target').click()
    cy.get('#white-background').should('contain', 'We do not save')
  })

  it('independently test the privacy policy page', ()=> {
    cy.visit("./src/privacy.html")
    cy.get('#title').should('contain', 'TAT CSC - Privacy Policy')
  })
})