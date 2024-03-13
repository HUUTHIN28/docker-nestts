export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const saltOrRounds = 10;
export const role = ['user', 'admin'];

export const MessageError = {
  NotFound: 'Not Found',
  AlreadyExist: 'Already Exist',
  DoesNotExist: 'Does Not Exist',
  NotHaveAccess: 'not have access',
};
