import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
var BackgroundHttp = require("nativescript-background-http");

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

  respondedHandler(e){
    alert("received " + e.responseCode + " code. Server sent: " + e.data);
  }

  upload_image(path:string){
    return new Observable((observer: any)=>{
      let session = BackgroundHttp.session("file-upload");
            let request = {
                url: 'http://192.168.0.150:5000/test',
                method: "POST",
                headers: {
                  "isMobile":"true"
                }
            };
            let params = [{ "name": "image", "filename": path, "mimeType": "image/png" }];
            let task = session.multipartUpload(params, request);
            task.on("error", event => {
                observer.error("Could not upload `" + path + "`. " + event.eventName);
            });
            task.on("responded", event=>{
                observer.next(event.data);
            });

    });
  }

  

}
