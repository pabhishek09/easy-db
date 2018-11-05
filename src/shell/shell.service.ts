import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  constructor(private http: Http) { }

  public getAllTables() {
    return this.http.get('http://localhost:5000/tables');
  }

  public getTableData(name: string) {
    const url = 'http://localhost:5000/table/' + name;
    return this.http.get(url);
  }

}
