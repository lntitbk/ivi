import {Server} from './Server';
import {IHandleSocket} from './IHandleSocket';

class App {
    constructor(private handle : IHandleSocket) {
    }
    run() : void {
        this.handle.run();
    }
}
const server = new Server();
const app = new App(server);
app.run();
