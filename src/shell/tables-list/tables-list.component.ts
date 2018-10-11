import { Component, Input } from '@angular/core';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.css']
})
export class TablesListComponent {

  @Input() tables: Array<string>;
  @Input() activeTable: string;
  faTable = faTable;

  constructor() { }


}
