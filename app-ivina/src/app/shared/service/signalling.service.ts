import { Injectable } from '@angular/core';
import {SocketioService} from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class SignallingService {
  constructor( private socketService : SocketioService) { 
    this.socketService.connect("https://10.4.100.58:3000");
  }

  //Open and close
  connect(url : string) {
    this.socketService.connect(url);
  }
  disconnect() {
    this.socketService.disconnect();
  }
  
  subcribe(evt : string) {
      return this.socketService.listen(evt);
  }
  
  publish(evt : string, data : any) {
      this.socketService.emit(evt, data);
  }

}
