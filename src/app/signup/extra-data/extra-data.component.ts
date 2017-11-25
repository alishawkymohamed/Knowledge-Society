import { PersonQualification } from './../../Models/PersonQualification';
import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ExtraDataService } from '../../shared/extra-data.service';
import { ApiService } from '../../shared/api.service';
import { UserDataService } from '../../shared/user-data.service';
import { Router } from '@angular/router';
import { RegisterService } from '../../shared/register.service';
import { ToastsManager } from 'ng2-toastr';
import { Qualification } from '../../Models/Qualification';
import { QualificationLevel } from '../../Models/QualificationLevel';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExtraDataComponent {
  public loading = true;
  public Qualifications: Qualification[] = [];
  public QualificationLevels: QualificationLevel[] = [];
  public PersonQualifications: PersonQualification[] = [];
  public PersonGrades: number[] = [];
  private User: any = null;
  constructor(private ExtraDataService: ExtraDataService, private ApiService: ApiService, private UserDataService: UserDataService, private router: Router, private RegisterService: RegisterService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    if (UserDataService.getUserData() == null) {
      this.toastr.info("من فضلك أدخل البيانات الاساسيه أولا !!", 'تنبيه!');
      setTimeout(() => {
        this.loading = true;
        router.navigateByUrl('/account/signup/personaldata');
      }, 3000);
    } else {
      if (ExtraDataService.GetData() == null) {
        this.User = UserDataService.getUserData();
        ApiService.ServerRequest(`/GeneralData/GetExtraData/${this.User.ID}`, 'GET', null).subscribe(
          (Data) => {
            this.loading = false;
            ExtraDataService.SetData(Data);
            this.Qualifications = Data.Qualifications;
            this.QualificationLevels = Data.QualificationLevels;
            this.PersonQualifications = Data.PersonQualifications;
            for (let index = 0; index < this.Qualifications.length; index++) {
              var temp = this.PersonQualifications.filter(
                (value) => { return value.QualificationID == this.Qualifications[index].ID && value.PersonID == this.User.ID }
              );
              if (temp.length == 0) {
                this.PersonGrades.push(0);
              } else {
                this.PersonGrades.push(temp[0].QualificationLevelID);
              }
            }


          },
          (error) => {
            this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
          }

        );

      } else {
        this.loading = false;
        this.User = UserDataService.getUserData();
        const SData = ExtraDataService.GetData();
        this.Qualifications = SData.Qualifications;
        this.QualificationLevels = SData.QualificationLevels;
        this.PersonQualifications = SData.PersonQualifications;
        for (let index = 0; index < this.Qualifications.length; index++) {
          var temp = this.PersonQualifications.filter(
            (value) => { return value.QualificationID == this.Qualifications[index].ID && value.PersonID == this.User.ID }
          );
          if (temp.length == 0) {
            this.PersonGrades.push(0);
          } else {
            this.PersonGrades.push(temp[0].QualificationLevelID);
          }
        }
      }
    }
  }

  ONSubmit(QualificationID: any, QualificationlevelID: any) {
    const temparray = this.PersonQualifications;
    var temp = this.PersonQualifications.filter(
      (value) => { return value.QualificationID == QualificationID && value.PersonID == this.User.ID }
    );
    if (temp.length == 0) {
      let newQual = new PersonQualification();
      newQual.PersonID = this.User.ID;
      newQual.QualificationID = QualificationID;
      newQual.QualificationLevelID = Number.parseInt(QualificationlevelID);
      this.PersonQualifications.push(newQual);
    } else {
      for (let index = 0; index < temparray.length; index++) {
        if (temparray[index].QualificationID == Number.parseInt(QualificationID) && temparray[index].PersonID == Number.parseInt(this.User.ID)) {
          temparray[index].QualificationLevelID = Number.parseInt(QualificationlevelID);
        }
        this.PersonQualifications = temparray;
      }
    }
  }
  SaveData() {
    this.loading = true;
    this.User.PersonQualifications = this.PersonQualifications;
    this.RegisterService.SendRegisterData({ TabName: 'Extra Data', PersonalData: this.User }).subscribe(
      (Response) => {
        if (Response != false) {
          this.toastr.success("تم تسجيل البيانات بنجاح ..");
          this.PersonQualifications = Response.PersonQualifications;
          this.ExtraDataService.SetPersonQualifications(Response.PersonQualifications);
          this.UserDataService.setUserData(Response);
          this.User = this.UserDataService.getUserData();
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/account', 'signup', 'personaldata']);
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
    this.router.navigate(['/account', 'signup', 'educationdata']);
  }
}
