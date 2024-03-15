import { Injectable } from '@nestjs/common'
import { UserService } from 'src/database/user/user.service'

@Injectable()
export class AuthorizationService {
  constructor(private readonly userService: UserService) {}
  async authorize(): Promise<string> {
    await this.userService.createUser({
      email: 'test@mail.com',
      name: 'somename',
    })
    const users = await this.userService.users({})
    console.log('users', users)
    return 'Hello Authorization!'
  }
}
