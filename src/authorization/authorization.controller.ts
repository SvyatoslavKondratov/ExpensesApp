import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { User } from '@prisma/client'
import { UserDTO } from 'src/database/dto/user'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter'

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly auhtorization: AuthorizationService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async authorize(@Body() body: UserDTO): Promise<User> {
    return this.auhtorization.authorize(body)
  }
}
