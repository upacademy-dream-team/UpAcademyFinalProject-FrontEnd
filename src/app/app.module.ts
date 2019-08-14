import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TestingPageComponent } from './testing-page/testing-page.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { ParticlesComponent } from './particles/particles.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    TestingPageComponent,
    NoPermissionComponent,
    ParticlesComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
