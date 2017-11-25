import { PersonQualification } from './../Models/PersonQualification';
import { QualificationLevel } from './../Models/QualificationLevel';
import { Qualification } from './../Models/Qualification';
import { Injectable } from '@angular/core';

@Injectable()
export class ExtraDataService {
  private Qualifications: Qualification[] = [];
  private QualificationLevels: QualificationLevel[] = [];
  private PersonQualifications: PersonQualification[] = [];
  constructor() { }

  SetData(Data: any) {
    this.Qualifications = Data.Qualifications;
    this.QualificationLevels = Data.QualificationLevels;
    this.PersonQualifications = Data.PersonQualifications;
  }

  GetData() {
    if (this.Qualifications.length != 0) {
      return {
        'Qualifications': this.Qualifications,
        'QualificationLevels': this.QualificationLevels,
        'PersonQualifications': this.PersonQualifications
      };
    } else {
      return null;
    }
  }
  SetPersonQualifications(Data) {
    this.PersonQualifications = Data;
  }

}
