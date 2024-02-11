import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {NgModule} from "@angular/core";
import {MainComponent} from "@modules/main/main.component";
import {MainContentComponent} from "@modules/main/main-content/main-content.component";
import {SharedModule} from "@shared/shared.module";
import {MainRoutingModule} from "@modules/main/main-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [MainComponent, MainContentComponent],
    imports: [
        SharedModule,
        MainRoutingModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        NgForOf,
        MatPaginatorModule,
        FlexLayoutModule,
        MatExpansionModule,
        DatePipe,
        NgIf,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule
    ],
})
export class MainModule {}
