import { Component, OnInit } from '@angular/core';
import { AppfirstService } from '../services/appfirst.service';

@Component({
  selector: 'app-assessfirst',
  templateUrl: './assessfirst.component.html',
  styleUrls: ['./assessfirst.component.css']
})
export class AssessfirstComponent implements OnInit {

  constructor(private appService:AppfirstService) { }

  ngOnInit() {
    this.appService.getCandidates('banu@experd.com').subscribe(
      res => {
        console.log(res);
      },
      err => { });
  }

}
