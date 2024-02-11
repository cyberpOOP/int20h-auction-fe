import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/http.interceptor';
import { jwtInterceptorProviders } from './interceptors/jwt.interceptor';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [httpInterceptorProviders, jwtInterceptorProviders],
    exports: [],
})
export class CoreModule {}
