import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers/http.interceptor';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [httpInterceptorProviders],
    exports: [],
})
export class CoreModule {}
