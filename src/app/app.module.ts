import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartComponent } from './start/start.component';
import { MainComponent } from './main/main.component';
import { SelectorComponent } from './selector/selector.component';
import { AdvertenciasComponent } from './advertencias/advertencias.component';
import { ResultComponent } from './result/result.component';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NativeScriptLoader } from '@danvick/ngx-translate-nativescript-loader';

//Importing the international packages


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader
            }
        })
    ],
    declarations: [
        AppComponent,
        StartComponent,
        MainComponent,
        SelectorComponent,
        AdvertenciasComponent,
        ResultComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/


export class AppModule { }

export function createTranslateLoader() {
    return new NativeScriptLoader("./assets/i18n/", ".json");
}