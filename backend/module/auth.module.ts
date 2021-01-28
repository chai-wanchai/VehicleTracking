import { Module } from '@nestjs/common';
import { JWTAuthGuard, LocalAuthGuard } from '../shared/auth.guard';
import { AuthService } from '../service/auth.service';
import { PassportModule } from '@nestjs/passport';
@Module({
	imports: [PassportModule],
	controllers: [],
	providers: [JWTAuthGuard, LocalAuthGuard, AuthService],
	exports: [AuthService, JWTAuthGuard, LocalAuthGuard]
})
export class AuthModule { }
