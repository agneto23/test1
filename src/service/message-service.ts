export class MessageService {

    public greetings(name: string){
        const message = `Hello ${name} your message will be send`;
        return {message}
    }

}
