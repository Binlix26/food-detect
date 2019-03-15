import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  loadingStatusChanged = new Subject<{ [s: string]: boolean }>();
  loggingChanged = new Subject<string>();

  constructor() {}

  startFetching(): void {
    this.loadingStatusChanged.next({ isLoading: true });
  }

  finishFeching(): void {
    this.loadingStatusChanged.next({ isLoading: false });
  }

  logError(message: string): void {
    console.log(message);
    this.loggingChanged.next(message);
  }

  clear(): void {
    this.loggingChanged.next('');
  }
}
