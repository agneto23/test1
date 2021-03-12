import { newApp } from "../src/app"
// const request = require("request");
const expect = require("chai").expect;
import {MessageService} from "../src/service/message-service"



describe("tests unit", function () {

    it("test", function (done) {
        const messageService = new MessageService();
        expect(messageService.greetings("Juan Perez")).to.equal(200);
        done();
    });

});


