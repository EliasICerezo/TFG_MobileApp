import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-advertencias',
  templateUrl: './advertencias.component.html',
  styleUrls: ['./advertencias.component.css'],
  moduleId: module.id,
})
export class AdvertenciasComponent implements OnInit {

  box_checked:boolean
  checktext:String
  constructor(private page:Page, private router:Router) {
  }

  ngOnInit() {
    this.page.actionBarHidden= true
    this.box_checked=false
    this.checktext = "Acepto las advertencias, acceder a la aplicacion"
  }

  accept(){
    this.router.navigate(["/selector"])
  }

  decline(){
    this.router.navigate(["/start"])
  }
  


}
