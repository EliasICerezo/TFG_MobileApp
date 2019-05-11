import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

@Component({
  selector: 'ns-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  moduleId: module.id,
})
export class StartComponent implements OnInit {

  constructor(private page:Page, private router:Router) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  submit(){
      this.router.navigate(["/advertencias"])
  }

}
