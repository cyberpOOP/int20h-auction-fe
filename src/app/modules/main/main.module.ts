import { NgModule } from '@angular/core';
import { MainComponent } from '@modules/main/main.component';
import { SharedModule } from '@shared/shared.module';
import { MainRoutingModule } from '@modules/main/main-routing.module';
import { MainContentComponent } from './main-content/main-content.component';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [MainComponent, MainContentComponent],
  imports: [
    SharedModule,
    MainRoutingModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatButtonModule,
    FlexModule,
    MatInputModule,
  ],
})
export class MainModule {}
