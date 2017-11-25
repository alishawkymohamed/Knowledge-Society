import { Injectable } from '@angular/core';

@Injectable()
export class WorkDataService {

  private WorkTypes = [];
  private WorkEquaties = [];
  private WorkRelation = [];
  private WorkDuration = [];
  private WorkTimeByYear = [];
  private WorkGoverates = [];
  private WorkArea = [];
  private WorkVillage = [];
  private WorkStatus = [];
  constructor() { }

  public SetData(data: any) {
    this.WorkTypes = data.WorkTypes;
    this.WorkEquaties = data.WorkEquaties;
    this.WorkRelation = data.WorkRelation;
    this.WorkDuration = data.WorkDuration;
    this.WorkTimeByYear = data.WorkTimeByYear;
    this.WorkGoverates = data.WorkGoverates;
    this.WorkVillage = data.WorkVillages;
    this.WorkArea = data.WorkAreas;
    this.WorkStatus = data.WorkStatus
  }
  public GetData() {
    if (this.WorkStatus.length != 0 &&
      this.WorkDuration.length != 0
      || this.WorkEquaties.length != 0
      || this.WorkRelation.length != 0
      || this.WorkDuration.length != 0
      || this.WorkGoverates.length != 0
      || this.WorkVillage.length != 0
      || this.WorkArea.length != 0
      || this.WorkTimeByYear.length != 0) {
      return {
        'WorkGoverates': this.WorkGoverates,
        'WorkVillage': this.WorkVillage,
        'WorkArea': this.WorkArea,
        'WorkTypes': this.WorkTypes,
        'WorkEquaties': this.WorkEquaties,
        'WorkRelation': this.WorkRelation,
        'WorkDuration': this.WorkDuration,
        'WorkTimeByYear': this.WorkTimeByYear,
        'WorkStatus': this.WorkStatus
      };
    }
    else {
      return null;
    }
  }
}
