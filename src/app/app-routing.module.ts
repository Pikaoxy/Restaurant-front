import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { TableComponent } from './table/table.component';
import { ListeTablesComponent } from './liste-tables/liste-tables.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ModifierTableComponent } from './modifier-table/modifier-table.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationComponent } from './reservation/reservation.component';


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
  },
  {
    path: "accueil",
    component: AccueilComponent
  },
  {
    path: "menu",
    component: MenuComponent
  },
  {
    path: "reservation",
    component: ReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
