import { newApp } from "../src/app"
// const request = require("request");
const jwt = require('jsonwebtoken');
const expect = require("chai").expect;
import {TokenService} from "../src/service/token-service"



describe("Token service test", function () {

    it("Should be create token", function (done){

        const user = {username: "user"}

        const key = "test";

        const token = jwt.sign(user, key, { expiresIn: '1800s' });

        const tokenService = new TokenService();
        tokenService.setTokenSecret("test");

        expect(tokenService.generateAccessToken(user).token).to.equal(token);
        done();
    });

});


