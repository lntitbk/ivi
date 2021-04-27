import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  readonly url : string = "http://127.0.0.1:3000";

  constructor() { 
  }

  connect(url : string) {
    this.socket = io(url);
  }

  disconnect() {
    this.socket.close();
  }
  listen(eventName: string) {
    return new Observable((subcriber) => {
        this.socket.on(eventName, (data: unknown) => {
          subcriber.next(data);
        });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
