import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from 'src/database/user/user.service'
import * as bcrypt from 'bcrypt'
import { CreateUserDTO, UserDTO } from 'src/database/dto/user'

@Injectable()
export class AuthorizationService {
  constructor(private readonly userService: UserService) {}

  async authorize(body: UserDTO): Promise<User> {
    const { email, password } = body
    const user = await this.userService.user({ email })
    const { password: userPassword } = user || {}
    const result = await bcrypt.compare(password, userPassword || '')
    if (!result) {
      throw new UnauthorizedException(
        { message: 'Incorrect credentials' },
        { description: 'Incorrect credentials' },
      )
    }
    return result
  }

  async signIn(body: CreateUserDTO): Promise<void> {
    const { email, password, confirmPassword, name } = body
    const user = await this.userService.user({ email })
    if (user) {
      throw new ConflictException(
        { message: 'email already used' },
        { description: 'email already used' },
      )
    }
    if (password.localeCompare(confirmPassword) === 0 && !user) {
      const hashedPassword = await bcrypt.hash(password, 12)
      await this.userService.createUser({
        email,
        password: hashedPassword,
        name,
      })
    } else {
      throw new UnauthorizedException(
        { message: 'Incorrect credentials' },
        { description: 'Incorrect credentials' },
      )
    }
  }
}
