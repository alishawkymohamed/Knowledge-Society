import { UserDataService } from './../../shared/user-data.service';
import { ApiService } from './../../shared/api.service';
import { BirthDataService } from './../../shared/birth-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-birth-data',
  templateUrl: './birth-data.component.html',
  styleUrls: ['./birth-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BirthDataComponent implements OnInit {
  public loading = false;
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

  constructor(private ApiService: ApiService, private BirthData: BirthDataService, UserDataService: UserDataService) {
    if (UserDataService.getUserData() === {}) {

    }
    if (BirthData.GetData().Governrates.length == 0) {
      ApiService.ServerRequest('/GeneralData/GetBirthData', 'GET', null).subscribe(
        (data) => {
          BirthData.SetData(data);
          const Sdata = BirthData.GetData();
          this.GovernrateArray = Sdata.Governrates;
          this.AreaArray = Sdata.Areas;
          this.VillageArray = Sdata.Villages;
          console.log(this.GovernrateArray);
        }
      )
    }
  }

  ngOnInit() {

  }
  SelectBirthGoverment(ID: any) {
    console.log(ID);
    this.SelectedArias = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }
  SelectLivingGoverment(ID: any) {
    console.log(ID);
    this.LivingAreaArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }

  SelectBirthVillage(ID: any) {
    console.log(ID);
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }

  SelectLivingVillage(ID: any) {
    console.log(ID);
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }
}
