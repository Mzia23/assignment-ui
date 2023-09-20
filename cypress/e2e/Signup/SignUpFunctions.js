import signUpElements from './SignUpElements';

// Generate a dynamic email address with a random identifier
const generateDynamicEmail = () => {
    const randomIdentifier = Math.floor(Math.random() * 1000000);
    const baseEmail = 'testuser';
    return `${baseEmail}${randomIdentifier}@example.com`;
  };

class SignUpFunctions {

CreatAUser(){
    // Generate a dynamic email address for this test run
    const dynamicEmail = generateDynamicEmail();
    cy.visit(signUpElements.Url);

    // Fill out the registration form
    cy.get(signUpElements.firstName).type('John1');
    cy.get(signUpElements.lastName).type('Doe1');
    cy.get(signUpElements.email).type(dynamicEmail);
    cy.get(signUpElements.enterPassword).type('Pakword213!');
    cy.get(signUpElements.enterPasswordConfirmation).type('Pakword213!');

    // Click the 'Create an Account' button
    cy.get(signUpElements.createAccount).click();

    // Assertions
    cy.url().should('eq', signUpElements.indexUrl);
    cy.get('.message-success').should('contain',signUpElements.thankYouMessage );
}

CreatInvalidUser(){

  cy.visit(signUpElements.Url);

  // Fill out the registration form with invalid data
  cy.get(signUpElements.email).type('invalid-email');
  cy.get(signUpElements.enterPassword).type('short');
  cy.get(signUpElements.enterPasswordConfirmation).type('mismatch');

  // Click the 'Create an Account' button
  cy.get(signUpElements.createAccount).click();

  // Assert error messages
  cy.get(signUpElements.firstNameError).should('be.visible').and('contain', signUpElements.errorMessageText); 
  cy.get(signUpElements.lastNameError).should('be.visible').and('contain', signUpElements.errorMessageText); 
  cy.get(signUpElements.emailError).should('be.visible').and('contain', signUpElements.emailErrorText); 
  cy.get(signUpElements.passwordError).should('be.visible').and('contain', signUpElements.passwordErrorMessageText);
  cy.get(signUpElements.passwordConfirmationError).should('be.visible').and('contain', signUpElements.passwordConfirmationErrorMessageText);
  // Assert that the page URL hasn't changed (indicating an error)
  cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/create/');
}

}
export default new SignUpFunctions();