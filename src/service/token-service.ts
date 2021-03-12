const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

export class TokenService {

    private tokenSecret;

    constructor() {
        this.tokenSecret = process.env.TOKEN_SECRET
    }

    public generateAccessToken(username: {username: string}) {
        const token = jwt.sign(username, this.tokenSecret, { expiresIn: '1800s' });
        return {token}
    }

    public setTokenSecret(value: string){
       this.tokenSecret = value
    }
}
