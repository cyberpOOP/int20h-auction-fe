import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MainModule } from '@modules/main/main.module';
import { ProfileModule } from '@modules/profile/profile.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, CoreModule, AuthModule, MainModule, ProfileModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
