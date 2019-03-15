import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  constructor() { }

  socketLogout() {
    // this.socket.
    // this.socket.emit('logout', true);
  }
}
