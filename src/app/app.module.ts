import { BirthDataService } from './shared/birth-data.service';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LogInComponent } from "./log-in/log-in.component";
import { LoginService } from "./shared/login.service";
import { HttpModule } from "@angular/http";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { PersonalDataComponent } from './signup/personal-data/personal-data.component';
import { BirthDataComponent } from './signup/birth-data/birth-data.component';
import { WorkDataComponent } from './signup/work-data/work-data.component';
import { EducationDataComponent } from './signup/education-data/education-data.component';
import { ExtraDataComponent } from './signup/extra-data/extra-data.component';
import { AppRoutingModule } from "./app-routing.module";
import { UserDataService } from "./shared/user-data.service";
import { ApiService } from "./shared/api.service";
import { RegisterService } from "./shared/register.service";
import { EducationDataService } from './shared/education-data.service';
import { ExtraDataService } from './shared/extra-data.service';
import { WorkDataService } from './shared/work-data.service';


export class CustomOption extends ToastOptions {
  animate = 'flyLeft';
  newestOnTop = false;
  showCloseButton = true;
}

@NgModule({
  declarations: [AppComponent,
    LogInComponent,
    SignupComponent,
    PersonalDataComponent,
    BirthDataComponent,
    WorkDataComponent,
    EducationDataComponent,
    ExtraDataComponent],

  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBorderRadius: '14px'
    }),
    ToastModule.forRoot(),
    AppRoutingModule],

  providers: [
    LoginService,
    UserDataService,
    { provide: ToastOptions, useClass: CustomOption },
    ApiService,
    BirthDataService,
    RegisterService,
    EducationDataService,
    ExtraDataService,
    WorkDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
