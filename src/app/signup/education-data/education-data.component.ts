import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { University } from './../../Models/University';
import { Year } from './../../Models/Year';
import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { PersonEducation } from '../../Models/PersonEducation';
import { Colledge } from '../../Models/Colledge';
import { Specialization } from '../../Models/Specialization';
import { ApiService } from '../../shared/api.service';
import { UserDataService } from '../../shared/user-data.service';
import { Router } from '@angular/router';
import { RegisterService } from '../../shared/register.service';
import { ToastsManager } from 'ng2-toastr';
import { EducationDataService } from '../../shared/education-data.service';
import { Degree } from '../../Models/Degree';
import { Courses } from '../../Models/Courses';
import { PersonTraining } from '../../Models/PersonTraining';
import { PersonExperience } from '../../Models/PersonExperience';
import { BusinessSector } from '../../Models/BusinessSector';

@Component({
  selector: 'app-education-data',
  templateUrl: './education-data.component.html',
  styleUrls: ['./education-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EducationDataComponent implements OnInit, OnDestroy {

  public loading = true;
  public User: any = null;
  public PersonEducation: PersonEducation[] = [];
  public Year: Year[] = []
  public Colledge: Colledge[] = [];
  public Specialization: Specialization[] = [];
  public University: University[] = [];
  public Degree: Degree[] = [];
  public PersonTraining: PersonTraining[] = [];
  public Courses: Courses[] = [];
  public PersonExperience: PersonExperience[] = [];
  public BusinessSector: BusinessSector[] = [];

  constructor(private ApiService: ApiService, private UserDataService: UserDataService, private router: Router, private RegisterService: RegisterService, public toastr: ToastsManager, vcr: ViewContainerRef, EducationData: EducationDataService) {
    this.toastr.setRootViewContainerRef(vcr);
    if (UserDataService.getUserData() == null) {
      this.toastr.info("من فضلك أدخل البيانات الاساسيه أولا !!", 'تنبيه!');
      setTimeout(() => {
        this.loading = true;
        router.navigateByUrl('/account/signup/personaldata');
      }, 3000);
    } else {
      this.User = UserDataService.getUserData();
      if (UserDataService.getUserData().ID == 0) {
        this.toastr.info("من فضلك أحفظ البيانات الاساسيه أولا !!", 'تنبيه!');
        this.loading = true;
        setTimeout(() => {
          router.navigateByUrl('/account/signup/personaldata');
        }, 1500);
      } else {
        if (EducationData.GetData() == null) {
          ApiService.ServerRequest(`/GeneralData/GetEducationData/${this.User.ID}`, 'GET', null).subscribe(
            (data) => {
              EducationData.SetData(data);
              const Sdata = EducationData.GetForceData();
              this.PersonEducation = Sdata.PersonEducation;
              this.Year = Sdata.Year;
              this.Colledge = Sdata.Colledge;
              this.Specialization = Sdata.Specialization;
              this.University = Sdata.University;
              this.Degree = Sdata.Degree;
              this.Courses = Sdata.Courses;
              this.PersonTraining = Sdata.PersonTraining;
              this.BusinessSector = Sdata.BusinessSector;
              this.PersonExperience = Sdata.PersonExperience;
              this.loading = false;
            }
          )
        }
        else {
          const Sdata = EducationData.GetData();
          this.PersonEducation = Sdata.PersonEducation;
          this.Year = Sdata.Year;
          this.Colledge = Sdata.Colledge;
          this.Specialization = Sdata.Specialization;
          this.University = Sdata.University;
          this.loading = false;
        }
      }
    }
  }

  ngOnInit() {
  }
  AddEducationData() {
    let p = new PersonEducation();
    p.PersonID = this.User.ID;
    this.PersonEducation.push(p);
  }
  RemoveLastEducation() {
    this.PersonEducation.pop();
    console.log(this.PersonEducation);
  }
  AddTraining() {
    let p = new PersonTraining();
    p.PersonID = this.User.ID;
    this.PersonTraining.push(p);
  }

  RemoveLastTraining() {
    this.PersonTraining.pop();
    console.log(this.PersonTraining);
  }

  AddExperience() {
    let p = new PersonExperience();
    p.PersonID = this.User.ID;
    this.PersonExperience.push(p);
  }
  RemoveLastExperience() {
    this.PersonExperience.pop();
  }

  OnSubmit() {
    this.loading = true;
    this.User.PersonEducations = this.PersonEducation;
    this.User.PersonTrainings = this.PersonTraining;
    this.User.PersonExperiences = this.PersonExperience;
    this.RegisterService.SendRegisterData({ TabName: 'Education Data', PersonalData: this.User }).subscribe(
      (Response) => {
        if (Response != false) {
          this.toastr.success("تم تسجيل البيانات بنجاح ..");
          this.loading = false;
          this.UserDataService.setUserData(Response);
          this.User = this.UserDataService.getUserData();
          setTimeout(() => {
            this.router.navigate(['/account', 'signup', 'extradata']);
          }, 1500);
        }
        else {
          this.loading = false;
          this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
        }
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error, 'خطأ!');
      }
    )
  }

  goBack() {
    this.router.navigate(['/account', 'signup', 'workdata']);
  }

  ngOnDestroy(): void {
    if (this.User != null) {
      if (this.User.ID != 0) {
        this.loading = true;
        this.User.PersonEducations = this.PersonEducation;
        this.User.PersonTrainings = this.PersonTraining;
        this.User.PersonExperiences = this.PersonExperience;
        this.RegisterService.SendRegisterData({ TabName: 'Education Data', PersonalData: this.User }).subscribe(
          (Response) => {
            if (Response != false) {
              this.toastr.success("تم تسجيل البيانات بنجاح ..");
              this.loading = false;
              this.UserDataService.setUserData(Response);
              this.User = this.UserDataService.getUserData();
            }
            else {
              this.loading = false;
              this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
            }
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error, 'خطأ!');
          }
        )
      }
    }
  }
}
