import { NgModule } from "@angular/core";
import { RouterModule, Routes, DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

import { LogInComponent } from "./log-in/log-in.component";
import { SignupComponent } from "./signup/signup.component";
import { PersonalDataComponent } from "./signup/personal-data/personal-data.component";
import { BirthDataComponent } from "./signup/birth-data/birth-data.component";
import { WorkDataComponent } from "./signup/work-data/work-data.component";
import { EducationDataComponent } from "./signup/education-data/education-data.component";
import { ExtraDataComponent } from "./signup/extra-data/extra-data.component";

const appRoutes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'account/login', component: LogInComponent },
    {
        path: 'account/signup', component: SignupComponent, children: [
            { path: '', redirectTo: 'personaldata', pathMatch: 'full' },
            { path: 'personaldata', component: PersonalDataComponent },
            { path: 'birthdaydata', component: BirthDataComponent },
            { path: 'workdata', component: WorkDataComponent },
            { path: 'educationdata', component: EducationDataComponent },
            { path: 'extradata', component: ExtraDataComponent }
        ]
    }]

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],

    providers: [
        { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
    ],

    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}


