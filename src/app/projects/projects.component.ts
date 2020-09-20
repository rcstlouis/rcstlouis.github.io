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

  projectEntries: ProjectListEntry[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  gitProjectEntries: IProject[] = [];

  projects: any;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  projectColumns: string[] = ['name', 'created_at', 'updated_at', 'language', 'open'];
  dataSource = new MatTableDataSource(this.projectEntries);
  projectsSource: MatTableDataSource<IProject>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    })
  }

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }

  debug() {
    debugger;
    console.log(`Debug Data`);
  }

}
