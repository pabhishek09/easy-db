import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpModule } from '@angular/http';
import { ShellComponent } from './shell.component';
import { TablesListComponent } from './tables-list/tables-list.component';
import { TableDataComponent } from './table-data/table-data.component';

@NgModule({
  declarations: [
    ShellComponent,
    TablesListComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  exports: [ ShellComponent ]
})
export class ShellModule { }
