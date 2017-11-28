import { ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { AppRoutingModule } from './../../app-routing.module';
import { UserDataService } from './../../shared/user-data.service';
import { ApiService } from './../../shared/api.service';
import { BirthDataService } from './../../shared/birth-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegisterService } from '../../shared/register.service';

@Component({
  selector: 'app-birth-data',
  templateUrl: './birth-data.component.html',
  styleUrls: ['./birth-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BirthDataComponent implements OnInit, OnDestroy {

  public loading = true;
  GovernrateArray = [];
  AreaArray = [];
  SelectedArias = [];
  LivingAreaArray = [];
  VillageArray = [];
  selectedVillages = [];
  LivingVillageArray = [];

  BirthGovernment: any = 0;
  BirthArea: any = 0;
  BirthVillage: any = 0;

  livingGovernment: any = 0;
  livingArea: any = 0;
  livingVillage: any = 0;

  User: any = null;

  constructor(private ApiService: ApiService, private BirthData: BirthDataService, private UserDataService: UserDataService, private router: Router, private RegisterService: RegisterService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    debugger;
    this.toastr.setRootViewContainerRef(vcr);
    if (UserDataService.getUserData() == null) {

      this.toastr.info("من فضلك أدخل البيانات الاساسيه أولا !!", 'تنبيه!');
      this.loading = true;
      setTimeout(() => {
        router.navigateByUrl('/account/signup/personaldata');
      }, 1500);

    }
    else {
      this.User = this.UserDataService.getUserData();
      if (UserDataService.getUserData().ID == 0) {
        this.toastr.info("من فضلك أحفظ البيانات الاساسيه أولا !!", 'تنبيه!');
        this.loading = true;
        setTimeout(() => {
          router.navigateByUrl('/account/signup/personaldata');
        }, 1500);
      }
      if (BirthData.GetData() == null) {
        ApiService.ServerRequest('/GeneralData/GetBirthData', 'GET', null).subscribe(
          (data) => {
            BirthData.SetData(data);
            const Sdata = BirthData.GetData();
            this.GovernrateArray = Sdata.Governrates;
            this.AreaArray = Sdata.Areas;
            this.VillageArray = Sdata.Villages;
            this.loading = false;
            if (UserDataService.getUserData() == null) {
              this.loading = false;
            }
            else {
              this.User = UserDataService.getUserData();
              this.BirthGovernment = this.User.POBGovernateID == null ? 0 : this.User.POBGovernateID;
              this.SelectBirthGoverment(this.User.POBGovernateID);
              this.BirthArea = this.User.POBAreaID == null ? 0 : this.User.POBAreaID;
              this.SelectBirthVillage(this.User.POBAreaID);
              this.BirthVillage = this.User.POBVillageID == null ? 0 : this.User.POBVillageID;
              this.livingGovernment = this.User.AddressGovernateID == null ? 0 : this.User.AddressGovernateID;
              this.SelectLivingGoverment(this.User.AddressGovernateID);
              this.livingArea = this.User.AddressAreaID == null ? 0 : this.User.AddressAreaID;
              this.SelectLivingVillage(this.User.AddressAreaID);
              this.livingVillage = this.User.AddressVillageID == null ? 0 : this.User.AddressVillageID;
            }
          }
        )

      }
      else {
        const Sdata = BirthData.GetData();
        this.GovernrateArray = Sdata.Governrates;
        this.AreaArray = Sdata.Areas;
        this.VillageArray = Sdata.Villages;
        this.BirthGovernment = this.User.POBGovernateID == null ? 0 : this.User.POBGovernateID;
        this.SelectBirthGoverment(this.User.POBGovernateID);
        this.BirthArea = this.User.POBAreaID == null ? 0 : this.User.POBAreaID;
        this.SelectBirthVillage(this.User.POBAreaID);
        this.BirthVillage = this.User.POBVillageID == null ? 0 : this.User.POBVillageID;
        this.livingGovernment = this.User.AddressGovernateID == null ? 0 : this.User.AddressGovernateID;
        this.SelectLivingGoverment(this.User.AddressGovernateID);
        this.livingArea = this.User.AddressAreaID == null ? 0 : this.User.AddressAreaID;
        this.SelectLivingVillage(this.User.AddressAreaID);
        this.livingVillage = this.User.AddressVillageID == null ? 0 : this.User.AddressVillageID;
        this.loading = false;
      }

    }


  }
  ngOnInit() {

  }

  SelectBirthGoverment(ID: any) {
    this.BirthArea = 0;
    this.SelectedArias = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }
  SelectLivingGoverment(ID: any) {
    this.livingArea = 0;
    this.LivingAreaArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }

  SelectBirthVillage(ID: any) {
    this.BirthVillage = 0;
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }

  SelectLivingVillage(ID: any) {
    this.livingVillage = 0;
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }
  OnSubmit() {
    this.loading = true;
    this.User.POBGovernateID = this.BirthGovernment == 0 ? null : this.BirthGovernment;
    this.User.POBAreaID = this.BirthArea == 0 ? null : this.BirthArea;
    this.User.POBVillageID = this.BirthVillage == 0 ? null : this.BirthVillage;
    this.User.AddressGovernateID = this.livingGovernment == 0 ? null : this.livingGovernment;
    this.User.AddressAreaID = this.livingArea == 0 ? null : this.livingArea;
    this.User.AddressVillageID = this.livingVillage == 0 ? null : this.livingVillage;
    this.RegisterService.SendRegisterData({ TabName: 'Birth Data', PersonalData: this.User }).subscribe(
      (Response) => {
        if (Response != false) {
          this.loading = false;
          this.UserDataService.setUserData(Response);
          this.User = this.UserDataService.getUserData();
          this.BirthGovernment = this.User.POBGovernateID == null ? 0 : this.User.POBGovernateID;
          this.SelectBirthGoverment(this.User.POBGovernateID);
          this.BirthArea = this.User.POBAreaID == null ? 0 : this.User.POBAreaID;
          this.SelectBirthVillage(this.User.POBAreaID);
          this.BirthVillage = this.User.POBVillageID == null ? 0 : this.User.POBVillageID;
          this.livingGovernment = this.User.AddressGovernateID == null ? 0 : this.User.AddressGovernateID;
          this.SelectLivingGoverment(this.User.AddressGovernateID);
          this.livingArea = this.User.AddressAreaID == null ? 0 : this.User.AddressAreaID;
          this.SelectLivingVillage(this.User.AddressAreaID);
          this.livingVillage = this.User.AddressVillageID == null ? 0 : this.User.AddressVillageID;
          this.toastr.success("تم تسجيل البيانات بنجاح ..");
          setTimeout(() => {
            this.router.navigate(['/account', 'signup', 'workdata']);
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
    this.router.navigate(['/account', 'signup', 'personaldata']);
  }

  ngOnDestroy(): void {
    if (this.User != null) {
      if (this.User.ID != 0) {
        this.loading = true;
        this.User.POBGovernateID = this.BirthGovernment == 0 ? null : this.BirthGovernment;
        this.User.POBAreaID = this.BirthArea == 0 ? null : this.BirthArea;
        this.User.POBVillageID = this.BirthVillage == 0 ? null : this.BirthVillage;
        this.User.AddressGovernateID = this.livingGovernment == 0 ? null : this.livingGovernment;
        this.User.AddressAreaID = this.livingArea == 0 ? null : this.livingArea;
        this.User.AddressVillageID = this.livingVillage == 0 ? null : this.livingVillage;
        this.RegisterService.SendRegisterData({ TabName: 'Birth Data', PersonalData: this.User }).subscribe(
          (Response) => {
            if (Response != false) {
              this.loading = false;
              this.UserDataService.setUserData(Response);
              this.User = this.UserDataService.getUserData();
              this.BirthGovernment = this.User.POBGovernateID == null ? 0 : this.User.POBGovernateID;
              this.SelectBirthGoverment(this.User.POBGovernateID);
              this.BirthArea = this.User.POBAreaID == null ? 0 : this.User.POBAreaID;
              this.SelectBirthVillage(this.User.POBAreaID);
              this.BirthVillage = this.User.POBVillageID == null ? 0 : this.User.POBVillageID;
              this.livingGovernment = this.User.AddressGovernateID == null ? 0 : this.User.AddressGovernateID;
              this.SelectLivingGoverment(this.User.AddressGovernateID);
              this.livingArea = this.User.AddressAreaID == null ? 0 : this.User.AddressAreaID;
              this.SelectLivingVillage(this.User.AddressAreaID);
              this.livingVillage = this.User.AddressVillageID == null ? 0 : this.User.AddressVillageID;
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


