import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private pathSource = new BehaviorSubject('');
  currentPath = this.pathSource.asObservable();


  constructor() { }

  changePath(path: string){
    this.pathSource.next(path)
  }
}
