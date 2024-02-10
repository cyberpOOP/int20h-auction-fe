import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
    imports: [CommonModule, RouterLink, RouterLinkActive, MatDialogModule, MatIconModule],
    declarations: [HeaderComponent, ModalComponent, ErrorComponent],
    exports: [HeaderComponent, ErrorComponent],
})
export class SharedModule {}
