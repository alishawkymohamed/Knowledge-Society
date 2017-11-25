import { ViewContainerRef } from '@angular/core';
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
export class BirthDataComponent implements OnInit {
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

  User: any = {};

  constructor(private ApiService: ApiService, private BirthData: BirthDataService, private UserDataService: UserDataService, private router: Router, private RegisterService: RegisterService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    if (UserDataService.getUserData() == null) {
      router.navigateByUrl('/account/signup/personaldata');
    }
    else {
      this.User = UserDataService.getUserData();
      this.BirthGovernment = this.User.POBGovernateID;
      this.BirthArea = this.User.POBAreaID;
      this.BirthVillage = this.User.POBVillageID;
      this.livingGovernment = this.User.AddressGovernateID;
      this.livingArea = this.User.AddressAreaID;
      this.livingVillage = this.User.AddressVillageID;
    }
    if (BirthData.GetData().Governrates.length == 0) {
      ApiService.ServerRequest('/GeneralData/GetBirthData', 'GET', null).subscribe(
        (data) => {
          BirthData.SetData(data);
          const Sdata = BirthData.GetData();
          this.GovernrateArray = Sdata.Governrates;
          this.AreaArray = Sdata.Areas;
          this.VillageArray = Sdata.Villages;
          this.loading = false;
        }
      )
    }
    else {
      this.loading = false
    }
  }

  ngOnInit() {

  }
  SelectBirthGoverment(ID: any) {
    this.SelectedArias = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }
  SelectLivingGoverment(ID: any) {
    this.LivingAreaArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }

  SelectBirthVillage(ID: any) {
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }

  SelectLivingVillage(ID: any) {
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }
  OnSubmit() {
    this.User.POBGovernateID = this.BirthGovernment == 0 ? null : this.BirthGovernment;
    this.User.POBAreaID = this.BirthArea == 0 ? null : this.BirthArea;
    this.User.POBVillageID = this.BirthVillage == 0 ? null : this.BirthVillage;
    this.User.AddressGovernateID = this.livingGovernment == 0 ? null : this.livingGovernment;
    this.User.AddressAreaID = this.livingArea == 0 ? null : this.livingArea;
    this.User.AddressVillageID = this.livingVillage == 0 ? null : this.livingVillage;
    this.RegisterService.SendRegisterData({ TabName: "Birth Data", PersonalData: this.User }).subscribe(
      (Response) => {
        if (Response != false) {
          this.toastr.success("تم تسجيل البيانات بنجاح ..");
          this.router.navigate(['/account', 'signup', 'workdata'])
        }
        else {
          this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
        }
      },
      (error) => {
        this.toastr.error(error, 'خطأ!');
      }
    )
  }


}

