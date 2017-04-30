import { Application } from '../application';
import { TypeTest } from '../type-test';
import { Resultat } from '../resultat';
import { Testeur } from '../testeur';
export class Campagne {
    constructor(
        public id?: number,
        public version?: string,
        public datedebut?: any,
        public datefin?: any,
        public commentaire?: string,
        public bloquant?: number,
        public majeur?: number,
        public mineur?: number,
        public evolution?: number,
        public termine?: boolean,
        public application?: Application,
        public typetest?: TypeTest,
        public resultat?: Resultat,
        public testeur?: Testeur,
    ) {
        this.termine = false;
    }
}
