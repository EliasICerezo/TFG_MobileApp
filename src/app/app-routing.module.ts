import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { StartComponent } from "./start/start.component";
import { MainComponent } from "./main/main.component";
import { SelectorComponent } from "./selector/selector.component";

const routes: Routes = [
    { path: "", redirectTo: "/start", pathMatch: "full" },
    { path: "start", component: StartComponent },
    { path: "main", component: MainComponent},
    { path: "selector", component: SelectorComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
