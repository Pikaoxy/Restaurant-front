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
import { ListeReservationsComponent } from './liste-reservations/liste-reservations.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthGuardManagerService } from './_services/auth-guard-manager.service';


const routes: Routes = [
  {
    path: "employe",
    component: EmployeComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
  },
  {
    path: "table",
    component: TableComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
  },
  {
    path: "liste-tables",
    component: ListeTablesComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
  },
  {
    path: "liste-employes",
    component: ListeEmployesComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
  },
  {
    path: "modifier-table/:id",
    component: ModifierTableComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
  },
  {
    path: "modifier-employe/:id",
    component: ModifierEmployeComponent,
    canActivate: [AuthGuardService,AuthGuardManagerService]
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
  },
  {
    path: "liste-reservations",
    component: ListeReservationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "connexion",
    component: ConnexionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
