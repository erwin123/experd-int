import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavmenu',
  templateUrl: './sidenavmenu.component.html',
  styleUrls: ['./sidenavmenu.component.css']
})
export class SidenavmenuComponent implements OnInit {
  collapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
