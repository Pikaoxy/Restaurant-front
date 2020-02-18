import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employe } from '../_models/employe';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Employe[]>('http://localhost:8080/employes').pipe();
  }

  getOne(id: number) {
    return this.http.get<Employe>('http://localhost:8080/employes/'+id).pipe();
  }

  addOne(employe: Employe) {
    return this.http.post("http://localhost:8080/employes",employe).pipe();
  }

  updateOne(id: number, employe: Employe) {
    return this.http.put('http://localhost:8080/employes'+id,employe).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/employes/'+id).pipe();
  }
}
