import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {
  constructor(private page:Page, private router:Router) { }

  ngOnInit() {
    this.page.actionBarHidden= true;
  }

  advertencias(){
    this.router.navigate(["/advertencias"]);
  }

  analizar(){
    this.router.navigate(["/selector"]);
  }

}
