import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
import { Image } from "tns-core-modules/ui/image";
import * as bghttp from "nativescript-background-http";
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { ResultService } from '../shared/result.service';


@Component({
  selector: 'ns-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  moduleId: module.id,
})



export class SelectorComponent implements OnInit {
  imageAssets = [];
  imageSrc: any;
  isSingleMode: boolean = true;
  thumbSize: number = 80;
  previewSize: number = 300;
  imageTaken: ImageAsset;

  constructor(private page: Page, private route: ActivatedRoute, private router: Router, private data:ResultService ) { }

  path:string
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.data.currentPath.subscribe(path => this.path = path)
  }

  escoger_de_galeria() {
    let context = imagepicker.create({
      mode: "single"
    });
    this.startSelection(context);
  };

  tomar_foto() {

    /*let options = {
      width: 300,
      height: 300,
      keepAspectRatio: true,
      saveToGallery: false
    };*/
    camera.requestPermissions()
    camera.takePicture().
      then((imageAsset) => {
        console.log("Result is an image asset instance");
        var image = new Image();
        image.src = imageAsset;
        console.log("ESTE ES EL PATH DE LA IMAGEN:"+image.src._android);
        this.data.changePath(image.src._android);
        this.router.navigate(["/result"]);
        //this.sendImage(image.src._android);
      }).catch((err) => {
        console.log("Error -> " + err.message);
      });
  };

  private startSelection(context) {
    let that = this;
    context
      .authorize()
      .then(() => {
        that.imageAssets = [];
        that.imageSrc = null;
        return context.present();
      })
      .then((selection) => {
        that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
        this.data.changePath(that.imageSrc._android);
        this.router.navigate(["/result"]);
        // this.sendImage(that.imageSrc._android);
      }).catch(function (e) {
        console.log(e);
      });
  };


  

}
