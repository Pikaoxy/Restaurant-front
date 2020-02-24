import { Commande } from './commande';
import { Plat } from './plat';

export class Choix {
    idChoix: number;
    commande: Commande;
    plat: Plat;
    nbPlat: number;
    montantChoix: number;
}