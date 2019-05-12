import { Component } from "@angular/core";
import {TranslateService} from '@ngx-translate/core';
import { device } from "tns-core-modules/platform";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent { 
    constructor(private translate: TranslateService) {
        if (device.language==="es"){
            translate.setDefaultLang('es');
        }else{
            translate.setDefaultLang('en');
        }
    }
    
    useLanguage(language: string) {
        this.translate.use(language);
    }


}
