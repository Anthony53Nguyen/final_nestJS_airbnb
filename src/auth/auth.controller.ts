import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {BodyLogin, BodySignUp } from './Dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('api/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }
 
    @Post("/signup")
    signup(@Body() body: BodySignUp){
        return this.authService.signup(body);
    }

    @Post("/login")
    login(@Body() body: BodyLogin): Promise<string> {     
        return this.authService.login(body);
    }
}