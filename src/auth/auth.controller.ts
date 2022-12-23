import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
	HttpCode,
} from '@nestjs/common'

@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.AuthService.register(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.AuthService.getNewTokens(dto)
	}
	

  @HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.AuthService.login(dto)
	}
}
