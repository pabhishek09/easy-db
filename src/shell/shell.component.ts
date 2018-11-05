import { Component, OnInit } from '@angular/core';
import { ShellService } from './shell.service';
import { Observable } from '../../node_modules/rxjs';
import { ThrowStmt } from '../../node_modules/@angular/compiler';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  private allTables: Array<string>;
  private activeTable: string;
  private activeTableData;

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
    this.shellService.getTableData(this.activeTable)
      .subscribe((data) => {
        this.activeTableData  = JSON.stringify(data.json());
        console.log(this.activeTableData);
      });
  }

}
