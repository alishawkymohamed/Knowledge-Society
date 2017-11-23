import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { BirthDataService } from '../../shared/birth-data.service';
import { UserDataService } from '../../shared/user-data.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkDataComponent {
  public loading = false;

  GovernrateArray = [];
  AreaArray = [];
  VillageArray = [];
  SelectedArias = [];
  selectedVillages = [];

  WorkGovernment: any = 0;
  WorkArea: any = 0;
  WorkVillage: any = 0;

  constructor(private ApiService: ApiService,
    private BirthData: BirthDataService,
    UserDataService: UserDataService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {

    this.loading = true;
    if (BirthData.GetData().Governrates.length == 0) {
      ApiService.ServerRequest('/GeneralData/GetBirthData', 'GET', null).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
          }
          BirthData.SetData(data);
          const Sdata = BirthData.GetData();
          this.GovernrateArray = Sdata.Governrates;
          this.AreaArray = Sdata.Areas;
          this.VillageArray = Sdata.Villages;
        },
        (error) => {
          if (error) {
            this.loading = false;
            this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
          }
        }
      )
    }
  }

  SelectWorkGoverment(ID: any) {
    this.SelectedArias = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.GovernateID) === Number.parseInt(ID);
      }
    );
  }

  SelectWorkVillage(ID: any) {
    this.VillageArray = this.AreaArray.filter(
      (value) => {
        return Number.parseInt(value.AreaID) === Number.parseInt(ID);
      }
    );
  }
}