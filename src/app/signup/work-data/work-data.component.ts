import { Component, ViewEncapsulation, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { BirthDataService } from '../../shared/birth-data.service';
import { UserDataService } from '../../shared/user-data.service';
import { ToastsManager } from 'ng2-toastr';
import { WorkDataService } from '../../shared/work-data.service';
import { RegisterService } from '../../shared/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkDataComponent {

  public loading = false;

  User: any = {};
  GovernrateArray = [];
  AreaArray = [];
  VillageArray = [];
  WorkTypes = [];
  WorkEquaties = [];
  WorkRelation = [];
  WorkDuration = [];
  WorkTimeByYear = [];
  WorkStatus = [];
  SelectedArias = [];
  selectedVillages = [];

  WorkGovernmentID: any = 0;
  WorkAreaID: any = 0;
  WorkVillageID: any = 0;
  WorkEquityID: any = 0;
  WordDurationID: any = 0;
  WorkRelationID: any = 0;
  WorkTypeID: any = 0;
  WorkTimePerYearID: any = 0;
  WorkStatusID: any = 0;
  IsCurrent: boolean = null;

  constructor(private ApiService: ApiService,
    private BirthData: BirthDataService,
    private UserDataService: UserDataService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router,
    private RegisterService: RegisterService,
    private WorkDataService: WorkDataService) {

    this.toastr.setRootViewContainerRef(vcr); // Toaster
    this.loading = true;

    if (this.UserDataService.getUserData() == null) {
      this.toastr.info("من فضلك أدخل البيانات الأساسية أولا !!", "تنبيه");
      setTimeout(() => {
        this.router.navigate(['/account', 'signup', 'personaldata']);
      }, 3000);
    }
    else {
      if (this.WorkDataService.GetData() == null) {
        this.ApiService.ServerRequest('/GeneralData/GetWorkData', 'GET', null).subscribe(
          (data) => {
            this.WorkDataService.SetData(data);
            const Sdata = this.WorkDataService.GetData();

            this.GovernrateArray = Sdata.WorkGoverates;
            this.VillageArray = Sdata.WorkVillage;
            this.AreaArray = Sdata.WorkArea;
            this.WorkTypes = Sdata.WorkTypes;
            this.WorkDuration = Sdata.WorkDuration;
            this.WorkRelation = Sdata.WorkRelation;
            this.WorkTimeByYear = Sdata.WorkTimeByYear;
            this.WorkEquaties = Sdata.WorkEquaties;
            this.WorkStatus = Sdata.WorkStatus;

            this.LoadUserData();

            if (data) {
              this.loading = false;
            }
          },
          (error) => {
            if (error) {
              this.loading = false;
              this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
            }
          }
        )
      }
      else {
        const Sdata = this.WorkDataService.GetData();

        this.GovernrateArray = Sdata.WorkGoverates;
        this.VillageArray = Sdata.WorkVillage;
        this.AreaArray = Sdata.WorkArea;
        this.WorkTypes = Sdata.WorkTypes;
        this.WorkDuration = Sdata.WorkDuration;
        this.WorkRelation = Sdata.WorkRelation;
        this.WorkTimeByYear = Sdata.WorkTimeByYear;
        this.WorkEquaties = Sdata.WorkEquaties;
        this.WorkStatus = Sdata.WorkStatus;

        this.LoadUserData();
        this.loading = false;
      }
    }

  }

  LoadUserData() {
    if (this.UserDataService.getUserData() != null) {
      this.User = this.UserDataService.getUserData();
      this.WorkGovernmentID = this.User.PersonWorkData.GovernateID == null ? 0 : this.User.PersonWorkData.GovernateID;
      if (this.WorkGovernmentID != null) {
        this.SelectWorkGoverment(Number.parseInt(this.WorkGovernmentID));
      }
      this.WorkAreaID = this.User.PersonWorkData.AreaID == null ? 0 : this.User.PersonWorkData.AreaID;
      if (this.WorkAreaID != null) {
        this.SelectWorkArea(Number.parseInt(this.WorkAreaID));
      }
      this.IsCurrent = this.User.PersonWorkData.IsCurrent;
      this.WordDurationID = this.User.PersonWorkData.JobDurationID;
      this.WorkTimePerYearID = this.User.PersonWorkData.JobHoursPerYearID;
      this.WorkRelationID = this.User.PersonWorkData.JobRelationID;
      this.WorkVillageID = this.User.PersonWorkData.VillageID == null ? 0 : this.User.PersonWorkData.VillageID;
      this.WorkEquityID = this.User.PersonWorkData.WorkEquityID;
      this.WorkStatusID = this.User.PersonWorkData.WorkStatusID;
      this.WorkTypeID = this.User.PersonWorkData.WorkTypeID;
    }
  }

  SelectWorkGoverment(ID: any) {
    this.SelectedArias = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
    this.WorkAreaID = 0;
    this.WorkGovernmentID = ID;
  }

  SelectWorkArea(ID: any) {
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
    this.WorkVillageID = 0;
    this.WorkAreaID = ID;
  }
  SelectWorkVillage(ID: any) {
    this.WorkVillageID = ID;
  }
  SelectWorkRelation(ID: any) {
    this.WorkRelationID = ID;
  }

  SelectWorkType(ID: any) {
    this.WorkTypeID = ID;
  }

  SelectWorkEquity(ID: any) {
    this.WorkEquityID = ID;
  }

  SelectWorkDuration(ID: any) {
    this.WordDurationID = ID;
  }

  SelectWorkTimePerYear(ID: any) {
    this.WorkTimePerYearID = ID;
  }

  SelectWorkStatus(ID: any) {
    this.WorkStatusID = ID;
  }

  SetIsCurrent(IsCurrent) {
    this.IsCurrent = (IsCurrent == 0) ? false : true;
  }

  SendWorkData() {
    this.loading = true;
    let personalData = {
      TabName: "Work Data",
      PersonalData: {
        Id: this.User.ID,
        PersonWorkData: {
          PersonID: this.User.ID,
          GovernateID: this.WorkGovernmentID,
          AreaID: this.WorkAreaID,
          VillageID: this.WorkVillageID,
          WorkEquityID: this.WorkEquityID,
          WorkTypeID: this.WorkTypeID,
          JobRelationID: this.WorkRelationID,
          IsCurrent: this.IsCurrent,
          JobDurationID: this.WordDurationID,
          JobHoursPerYearID: this.WorkTimePerYearID,
          WorkStatusID: this.WorkStatusID
        }
      }
    }
    this.RegisterService.SendRegisterData(personalData).subscribe(
      (data) => {
        if (data != false) {
          this.UserDataService.setUserData(data);
          this.loading = false;
          this.toastr.success("تم تسجيل البيانات بنجاح ..");
          setTimeout(() => {
            this.router.navigate(['/account', 'signup', 'educationdata']);
          }, 3000);
        }
        else {
          this.loading = false;
          this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
        }
      }
    )
  }

  goBack() {
    this.router.navigate(['/account', 'signup', 'birthdaydata']);
  }
}