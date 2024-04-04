import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserDTO } from 'src/database/dto/user'
import { AuthGuard } from './authorization.guard'
import { User } from '@prisma/client'

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly auhtorization: AuthorizationService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  async authorize(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<Partial<User>> {
    const { body, session } = request
    return this.auhtorization.authorize(body as UserDTO, session, response)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @UseFilters(new HttpExceptionFilter())
  getProfile(@Req() req) {
    return req.user
  }
}
