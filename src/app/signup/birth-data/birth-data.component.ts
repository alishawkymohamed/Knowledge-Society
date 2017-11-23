import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-birth-data',
  templateUrl: './birth-data.component.html',
  styleUrls: ['./birth-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BirthDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sad = 1;
  }

}
