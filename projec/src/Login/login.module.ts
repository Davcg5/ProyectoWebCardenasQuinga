import {Module} from "@nestjs/common";
import {LoginController} from "./login.controller";
import {LoginService} from "./login.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {LoginEntity} from "./login.entity";


@Module({
    imports: [

        TypeOrmModule.forFeature([])

    ],
    controllers: [
        LoginController
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginService
    ]


})

export class LoginModule {

}