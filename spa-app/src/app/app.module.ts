import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  /**
   * arreglar interceptor
   */
  providers: [provideHttpClient(/*withInterceptors(undefined)*/),
    // [provideHttpClient(withInterceptors([jwtInterceptor])),
  CookieService,
  provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
