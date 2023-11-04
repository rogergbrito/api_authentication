export interface SignupUserInterface {
  name: string,
  email: string,
  password: string,
}

export interface UpdateUserInterface{
  name: string,
  email: string,
  active: boolean,
  admin: boolean,
}
