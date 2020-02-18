import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../_models/table';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Table[]>('http://localhost:8080/tables').pipe();
  }

  getOne(id: number) {
    return this.http.get<Table>('http://localhost:8080/tables/'+id).pipe();
  }

  addOne(table: Table) {
    return this.http.post("http://localhost:8080/tables",table).pipe();
  }

  updateOne(id: number, table: Table) {
    return this.http.put('http://localhost:8080/tables/'+id,table).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/tables/'+id).pipe();
  }
}
