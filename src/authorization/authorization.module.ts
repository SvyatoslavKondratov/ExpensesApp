import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { AuthorizationController } from './authorization.controller'
import { UserModule } from 'src/database/user/user.module'

@Module({
  imports: [UserModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
