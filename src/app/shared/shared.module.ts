import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterLink, RouterLinkActive],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class SharedModule {}
