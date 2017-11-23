import { Injectable } from '@angular/core';

@Injectable()
export class BirthDataService {
  private Governrates = [];
  private Areas = [];
  private Villages = [];
  constructor() { }

  public SetData(data: any) {
    console.log('fromService');
    this.Governrates = data.GoverateData;
    this.Areas = data.Areas;
    this.Villages = data.Villages;
  }
public GetData() {
  return {'Governrates' : this.Governrates,
          'Areas': this.Areas,
          'Villages': this.Governrates
        };
}
}
