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
<<<<<<< Updated upstream
  providers: [provideHttpClient(/*withInterceptors(undefined)*/)],
=======
  /**
   * arreglar interceptor
   */
  providers: [provideHttpClient(/*withInterceptors(undefined)*/),
    // [provideHttpClient(withInterceptors([jwtInterceptor])),
  CookieService,
  provideAnimationsAsync()
  ],
>>>>>>> Stashed changes
  bootstrap: [AppComponent],
})
export class AppModule {}
