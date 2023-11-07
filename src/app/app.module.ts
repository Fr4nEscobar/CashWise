import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { LoginComponent } from './login/login.component';
import { CargarScriptsService } from './cargar-scripts.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { FuturePaymentsComponent } from './future-payments/future-payments.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    DetailsComponent,
    FuturePaymentsComponent,
    NotificationsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    
    
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

