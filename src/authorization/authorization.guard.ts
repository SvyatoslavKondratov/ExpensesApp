import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/common/prisma.service'
import { isAfter } from 'date-fns'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (!request.cookies?.sid) {
      throw new UnauthorizedException(
        { message: 'User not authorized' },
        { description: 'User not authorized' },
      )
    }
    console.log('request.cookies', request.cookies)
    const sessionId = request.cookies.sid
    const databaseSession = await this.prisma.sessions.findUnique({
      where: { id: sessionId },
    })
    const { expires, session } = databaseSession || {}
    request['user'] = JSON.parse(session).user

    return Boolean(databaseSession) && isAfter(new Date(expires), Date.now())
  }
}
