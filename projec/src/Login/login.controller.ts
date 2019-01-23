import {Controller, Get, Res} from "@nestjs/common";

import {LoginService} from "./login.service";

@Controller('Login')

export class LoginController {

    constructor(
        private readonly __loginService: LoginService
    ) {

    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('login');
    }


}