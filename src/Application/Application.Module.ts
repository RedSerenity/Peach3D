import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { ApplicationComponent } from "./Application.Component";
import { Peach3dModule } from "../Peach3d";

@NgModule({
  imports:      [ BrowserModule, FormsModule, Peach3dModule ],
  declarations: [ ApplicationComponent ],
  bootstrap:    [ ApplicationComponent ]
})
export class ApplicationModule { }
