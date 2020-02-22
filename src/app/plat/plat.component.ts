import { Component, OnInit } from '@angular/core';
import { PlatService } from '../_services/plat.service';
import { Plat } from '../_models/plat';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {

  newPlat: Plat = new Plat;

  constructor(private platService: PlatService) { }

  ngOnInit() {
  }

  ajouterPlat() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous ajouter le plat ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ajouter'
    }).then((result) => {
      if (result.value) {
        this.platService.addOne(this.newPlat).subscribe(
          data => {
            Swal.fire(
              'Ajouté !',
              'Votre palt a bien été ajouté.',
              'success'
            );
          }
        );
      }
    });
  }

}
