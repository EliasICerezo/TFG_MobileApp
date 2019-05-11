import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../shared/result.service';
import { path } from 'tns-core-modules/file-system/file-system';
// import * as bghttp from "nativescript-background-http";
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { fromObject } from "tns-core-modules/data/observable";
import { BindingOptions } from "tns-core-modules/ui/core/bindable";


const source = fromObject({
  textSource: "Text set via twoWay binding"
});

import { TextField } from "tns-core-modules/ui/text-field";
const targetTextField = new TextField();

const textFieldBindingOptions: BindingOptions = {
  sourceProperty: "textSource",
  targetProperty: "text",
  twoWay: false
};

@Component({
  selector: 'ns-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  moduleId: module.id,
})
export class ResultComponent implements OnInit {

  public path:string;
  public loading:boolean;
  public resultado:string;

  
  constructor(private data:ResultService, private page:Page, private router:Router) { 
    page.bindingContext= source;
    
  }

  ngOnInit() {
    this.page.actionBarHidden= true;
    this.data.currentPath.subscribe(path => this.path = path);
    this.resultado="";
    }

  ngAfterViewInit() {
    var filename:string;
    this.data.upload_image(this.path)
      .subscribe(result=>{
        var dictionary:any = JSON.parse(result.toString())
        // alert(dictionary["TEST"])
        this.resultado=dictionary["veredict"]
      }, error=> {
        alert(error);
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }

  redirectAdvertencias(){
    this.router.navigate(["/advertencias"]);
  }

  



}
