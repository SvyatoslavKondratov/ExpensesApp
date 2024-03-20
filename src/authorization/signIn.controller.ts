import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { CreateUserDTO } from 'src/database/dto/user'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter'

@Controller('signIn')
export class SignInController {
  constructor(private readonly auhtorization: AuthorizationService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async sigIn(@Body() body: CreateUserDTO): Promise<void> {
    return this.auhtorization.signIn(body)
  }
}
