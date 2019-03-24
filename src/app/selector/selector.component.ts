import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
import { Image } from "tns-core-modules/ui/image";
import * as bghttp from "nativescript-background-http";

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


  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
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

    camera.takePicture().
      then((imageAsset) => {
        console.log("Result is an image asset instance");
        var image = new Image();
        image.src = imageAsset;
        console.log("ESTE ES EL PATH DE LA IMAGEN:"+image.src._android);
        this.sendImage(image.src._android);
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

        this.sendImage(that.imageSrc._android);


        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
        selection.forEach(function (element) {
          element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
          element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
        });

        that.imageAssets = selection;

      }).catch(function (e) {
        console.log(e);
      });
  };


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
