import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../shared/result.service';
import { path } from 'tns-core-modules/file-system/file-system';
import * as bghttp from "nativescript-background-http";
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { fromObject } from "tns-core-modules/data/observable";


@Component({
  selector: 'ns-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  moduleId: module.id,
})
export class ResultComponent implements OnInit {

  path:string;
  minimizedpath:string;
  loading:boolean;

  constructor(private data:ResultService, private page:Page, private router:Router) { }

  ngOnInit() {
    this.page.actionBarHidden= true;
    this.data.currentPath.subscribe(path => this.path = path);
    this.loading=true;
  }

  ngAfterViewInit() {
    this.sendImage(this.path);
  }

  redirectAdvertencias(){
    this.router.navigate(["/advertencias"]);
  }

  private sendImage(path:string){
    var session = bghttp.session("image-upload");
    var request = {
      url: "http://192.168.0.150:5000/test",
      method: "POST",
      headers: { "isMobile": "true" },
      description: "Uploading an Image"
    };
    var task = session.uploadFile(path, request);
    var params =[
      { name: "image", filename: path, mimeType: "image/jpeg" }
    ]
    var task = session.multipartUpload(params,request);
    task.on("responded", respondedHandler);
    task.on("error", errorHandler);

    function respondedHandler(e) {
      this.minimizedpath=path
      alert("received " + e.responseCode + " code. Server sent: " + e.data);
      
    }

    function errorHandler(e) {
      alert("received " + e.responseCode + " code.");
      var serverResponse = e.response;
    }
    /*
    -pasar el sendImage a la otra vista 
    -ver como pasar ese string del path entre vistas
    -result management
    */ 
  }



}
