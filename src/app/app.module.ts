import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environmentProd } from 'src/environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { EmailDirective } from './directives/email-directive';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { SupermercadoPipe } from './pipes/supermercado.pipe';
@NgModule({
  declarations: [AppComponent, EmailDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environmentProd.firebaseConfig),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    PagesModule,
    FormsModule,
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    CookieService,
    SupermercadoPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
