import { Component, Input, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  constructor() { }

  @Input() tableData: any;

  ngOnInit() {
    console.log(this.tableData);
  }

}
