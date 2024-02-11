import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from '@modules/profile/profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from '@core/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, ProfileRoutingModule, SharedModule, DirectivesModule, ReactiveFormsModule],
})
export class ProfileModule {}
