import { Component, OnInit } from '@angular/core';
// import { ProjectListEntry } from './project-list-entry.model';
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { FormControl } from '@angular/forms';
import { MatFormField, MatLabel, MatFormFieldControl } from '@angular/material/form-field'
// import { ProjectListService } from "../project-list.service";
import { IProject } from "../model/project.model";
import { HttpService } from '../http.service';


export interface ProjectListEntry {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'mstl-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  gitProjectEntries: IProject[] = [];

  projects: any;

  projectColumns: string[] = ['name', 'created_at', 'updated_at', 'language', 'open'];
  projectsSource: MatTableDataSource<IProject>;

  applyGitHubFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    // this.projectsSource.filterPredicate = (project: IProject, filter: string) => {
    //   return project.name === filter
    //   || project.language === filter
    //   || project.updated_at === filter
    //   || project.created_at === filter
    // };
    this.projectsSource.filter = filterValue.trim().toLowerCase();
  }

  filterControl = new FormControl("");
  gitHubFilterControl = new FormControl("");

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    // this.projects = this.projectsService.getProjects();
    this.httpService.getProjectList().subscribe({
      next: data => {
        console.log(`Data for the table: ${JSON.stringify(data)}`);
        this.gitProjectEntries = data;
        this.projectsSource = new MatTableDataSource(this.gitProjectEntries);
      }, error: err => {
        console.error(`Problem loading the table data: ${JSON.stringify(err)}`);
      }
    });
  }

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }

  debug() {
    debugger;
    console.log(`Debug Data`);
  }

}
