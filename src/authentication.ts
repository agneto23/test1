import * as express from "express";
import * as jwt from "jsonwebtoken";
const dotenv = require("dotenv");

dotenv.config();

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "api_key") {
        let token;
        if (request.headers && request.headers["x-parse-rest-api-key"]) {
            token = request.headers["x-parse-rest-api-key"];
        }

        if (token === process.env.API_KEY) {
            return Promise.resolve({
                id: 1,
                name: "Ironman",
            });
        } else {
            return Promise.reject({});
        }
    }

    if (securityName === "jwt") {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers["x-jwt-kwy"];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(token, process.env.TOKEN_SECRET, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    // Check if JWT contains all required scopes
                    for (let scope of scopes) {
                        if (!decoded.scopes.includes(scope)) {
                            reject(new Error("JWT does not contain required scope."));
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
}
