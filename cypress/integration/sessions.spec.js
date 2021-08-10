describe('User Auth - Sessions', function() {
  beforeEach(function() {
    cy.task('taskTruncateTables')
    cy.task('taskCreateTestUser')
  })

  it('is redirected back to sign in if not signed in', function() {
    cy.visit('/top-secret')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains("sign up")
    cy.contains("sign in")
    cy.get('#welcome-message').should("not.exist")
  })

  it('can click on sign up', function() {
    cy.visit('/')
    cy.get('#signup-link').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/registrations/new')
  })

  it('can click on sign in', function() {
    cy.visit('/')
    cy.get('#signin-link').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/sessions/new')
  })

  it('can sign in', function() {
    cy.visit('sessions/new')
    cy.get('#sessions-email').type('test@test.com')
    cy.get('#sessions-password').type('test12')
    cy.get('#sessions-submit').click()
    cy.url().should('eq', Cypress.config().baseUrl + "/top-secret")
    cy.get('#welcome-message').should("contain", "Welcome, test@test.com!")
  })

  it('wrong email prevents sign in', function() {
    cy.visit('sessions/new')
    cy.get('#sessions-email').type('wrong@email.com')
    cy.get('#sessions-password').type('test12')
    cy.get('#sessions-submit').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/sessions')
    cy.get('#errors').should("contain", "sorry, details not valid")
  })

  it('wrong password prevents sign in', function() {
    cy.visit('sessions/new')
    cy.get('#sessions-email').type('test@test.com')
    cy.get('#sessions-password').type('wrongPassword')
    cy.get('#sessions-submit').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/sessions')
    cy.get('#errors').should("contain", "sorry, details not valid")
  })

  it('can sign out', function() {
    cy.visit('sessions/new')
    cy.get('#sessions-email').type('test@test.com')
    cy.get('#sessions-password').type('test12')
    cy.get('#sessions-submit').click()
    cy.url().should('eq', Cypress.config().baseUrl + "/top-secret")
    cy.get('#welcome-message').should("contain", "Welcome, test@test.com!")
    cy.get('#sign-out').click()
    cy.contains("sign up")
    cy.contains("sign in")
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
