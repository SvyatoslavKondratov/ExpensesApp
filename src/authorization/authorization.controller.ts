import { Controller, Get } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly auhtorization: AuthorizationService) {}

  @Get()
  async authorize(): Promise<string> {
    return this.auhtorization.authorize()
  }
}
