import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ClrDatagridStringFilterInterface } from "@clr/angular";

class ProjectFilter implements ClrDatagridStringFilterInterface<Project> {
    accepts(proj: Project, search: string):boolean {
        return "" + proj.projectcode == search
            || proj.projectname.toLowerCase().indexOf(search) >= 0;
    }
}

class ClientFilter implements ClrDatagridStringFilterInterface<Project> {
  accepts(proj: Project, search: string):boolean {
      return "" + proj.clientcode == search
          || proj.clientname.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectFilter;
  clientFilter;
  projList = proj;

  showInput = false;
  constructor() { }

  ngOnInit() {
    this.projectFilter = new ProjectFilter();
    this.clientFilter = new ClientFilter();
  }

}

var proj:Project[] = [
  {projectcode : "001", projectname:"ASDP Indonesia Ferry", clientcode:"001", clientname:"ASDP Indonesia", assessmentdate:"2018-01-01", flagupdate:true},
  {projectcode : "002", projectname:"Astra Daihatsu", clientcode:"002", clientname:"Astra Daihatsu Assessment 12", assessmentdate:"2018-02-01", flagupdate:true}
]