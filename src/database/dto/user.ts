export class UserDTO {
  password: string
  email: string
}

export class CreateUserDTO {
  email: string
  password: string
  confirmPassword: string
  name: string
}
