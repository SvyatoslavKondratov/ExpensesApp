import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { AuthorizationController } from './authorization.controller'
import { UserModule } from 'src/database/user/user.module'
import { SignInController } from './signIn.controller'

@Module({
  imports: [UserModule],
  controllers: [AuthorizationController, SignInController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
