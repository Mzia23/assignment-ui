
import SignUpFunctions from './SignUpFunctions'


it('Visits the registration page and creates an account', () => {
    SignUpFunctions.CreatAUser()
  });

it('Attempts to create an account with invalid data', () => {
    SignUpFunctions.CreatInvalidUser()
  });
  
