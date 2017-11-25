import { PersonTraining } from './../Models/PersonTraining';
import { Degree } from './../Models/Degree';
import { Colledge } from './../Models/Colledge';
import { University } from './../Models/University';
import { Specialization } from './../Models/Specialization';
import { Year } from './../Models/Year';
import { PersonEducation } from './../Models/PersonEducation';
import { Injectable } from '@angular/core';
import { Courses } from '../Models/Courses';
import { PersonExperience } from '../Models/PersonExperience';
import { BusinessSector } from '../Models/BusinessSector';

@Injectable()
export class EducationDataService {
  private PersonEducation: PersonEducation[] = [];
  private Year: Year[] = []
  private Colledge: Colledge[] = [];
  private Specialization: Specialization[] = [];
  private University: University[] = [];
  private Degree: Degree[] = []
  private PersonTraining: PersonTraining[] = [];
  private Courses: Courses[] = [];
  private PersonExperience: PersonExperience[] = [];
  private BusinessSector: BusinessSector[] = [];

  constructor() {

  }
  SetData(Data: any) {
    this.Colledge = Data.Colledge;
    this.PersonEducation = Data.PersonEducation;
    this.Year = Data.Year;
    this.Specialization = Data.Specialization;
    this.University = Data.University;
    this.Degree = Data.Degree;
    this.PersonTraining = Data.PersonTraining;
    this.Courses = Data.Courses;
    this.BusinessSector = Data.BusinessSector;
    this.PersonExperience = Data.PersonExperience;
  }
  GetData() {
    if (Year.length != 0 &&
      Colledge.length != 0 &&
      Specialization.length != 0 &&
      University.length != 0
    ) {
      return {
        'Colledge': this.Colledge,
        'PersonEducation': this.PersonEducation,
        'Year': this.Year,
        'Specialization': this.Specialization,
        'University': this.University,
        'Degree': this.Degree,
        'Courses': this.Courses,
        'PersonTraining': this.PersonTraining,
        'BusinessSector': this.BusinessSector,
        'PersonExperience': this.PersonExperience
      }
    }
    else {
      return null;
    }
  }

  GetForceData() {
    return {
      'Colledge': this.Colledge,
      'PersonEducation': this.PersonEducation,
      'Year': this.Year,
      'Specialization': this.Specialization,
      'University': this.University,
      'Degree': this.Degree,
      'Courses': this.Courses,
      'PersonTraining': this.PersonTraining,
      'BusinessSector': this.BusinessSector,
      'PersonExperience': this.PersonExperience
    };

  }
}
