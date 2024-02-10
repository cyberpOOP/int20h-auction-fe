import { NgModule } from "@angular/core";
import { MainComponent } from "@modules/main/main.component";
import { SharedModule } from "@shared/shared.module";
import { MainRoutingModule } from "@modules/main/main-routing.module";
import { MainContentComponent } from "./main-content/main-content.component";

@NgModule({
  declarations: [
    MainComponent,
    MainContentComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
