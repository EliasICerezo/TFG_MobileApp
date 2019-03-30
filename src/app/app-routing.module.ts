import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { StartComponent } from "./start/start.component";
import { MainComponent } from "./main/main.component";
import { SelectorComponent } from "./selector/selector.component";
import { AdvertenciasComponent } from "./advertencias/advertencias.component";
import { ResultComponent } from "./result/result.component";

const routes: Routes = [
    { path: "", redirectTo: "/start", pathMatch: "full" },
    { path: "start", component: StartComponent },
    { path: "main", component: MainComponent},
    { path: "selector", component: SelectorComponent},
    { path: "advertencias", component: AdvertenciasComponent},
    { path: "result", component: ResultComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
