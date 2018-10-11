import { Component, OnInit } from '@angular/core';
import { ShellService } from './shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  private allTables: Array<string>;
  private activeTable: string;

  constructor(private shellService: ShellService) {
  }

  ngOnInit() {
    this.shellService.getAllTables()
    .subscribe((data) => {
      this.allTables = data.json();
      this.activeTable = this.allTables[0];
      this.setUpDataForTable();
      console.log(this.allTables);
    }, (error) => {

    });
  }

  setUpDataForTable() {
  }

}
