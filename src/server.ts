import { newApp } from "./app";
import * as http from "http";

const app = newApp();

const port = 3000;

http.createServer({}, app).listen(port, () => {
    console.log(`Server started listening to port ${port}`);
});
