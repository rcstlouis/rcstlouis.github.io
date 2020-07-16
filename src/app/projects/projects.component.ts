import { Component, OnInit } from '@angular/core';
// import { ProjectListEntry } from './project-list-entry.model';
import { MatTableDataSource } from '@angular/material/table'
import { FormControl } from '@angular/forms';
import { MatFormField, MatLabel, MatFormFieldControl } from '@angular/material/form-field'
// import { ProjectListService } from "../project-list.service";


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
  projects: any;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.projectEntries);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterControl = new FormControl("");

  // constructor(private projectsService: ProjectListService) { }
  constructor() { }

  ngOnInit(): void {
    // this.projects = this.projectsService.getProjects();
  }

}
