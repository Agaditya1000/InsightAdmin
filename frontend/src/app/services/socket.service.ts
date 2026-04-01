import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  // Use environment variables or global constants in production
  private readonly url = 'http://localhost:3000'; 

  constructor() {
    this.socket = io(this.url);
  }

  onNewSale(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newSale', (data) => observer.next(data));
    });
  }

  onNewUser(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newUser', (data) => observer.next(data));
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
