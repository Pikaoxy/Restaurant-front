import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { TableComponent } from './table/table.component';
import { ListeTablesComponent } from './liste-tables/liste-tables.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ModifierTableComponent } from './modifier-table/modifier-table.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';


const routes: Routes = [
  {
    path: "employe",
    component: EmployeComponent
  },
  {
    path: "table",
    component: TableComponent
  },
  {
    path: "liste-tables",
    component: ListeTablesComponent
  },
  {
    path: "liste-employes",
    component: ListeEmployesComponent
  },
  {
    path: "modifier-table/:id",
    component: ModifierTableComponent
  },
  {
    path: "modifier-employe/:id",
    component: ModifierEmployeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
