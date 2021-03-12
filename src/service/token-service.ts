const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

export class TokenService {

    public generateAccessToken(username) {
        // expires after half and hour (1800 seconds = 30 minutes)
        const token = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
        return {token}
    }
}
