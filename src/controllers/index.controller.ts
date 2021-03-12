import { Controller, Get, Route, Post, Body, Security } from 'tsoa';
import { MessageService } from '../service/message-service'
import { TokenService } from '../service/token-service'
import { MessageVO } from "../vo/request";

@Route('')
export class IndexController extends Controller {

    private messageService;
    private tokenService;

    constructor() {
        super();
        this.messageService = new MessageService();
        this.tokenService = new TokenService();
    }

    @Get('')
    public async index() {
        return { msg: 'Hello World!' };
    }

    @Post('DevOps')
    @Security("api_key")
    @Security("jwt")
    public async create(@Body() request: MessageVO) {
        return this.messageService.greetings(request.to);
    }

    @Get('/token')
    public async token() {
        return this.tokenService.generateAccessToken({username: `test`});
    }

}
