import { TypeTest } from '../type-test';
import { Campagne } from '../campagne';
export class Testeur {
    constructor(
        public id?: number,
        public identifiant?: string,
        public nom?: string,
        public prenom?: string,
        public typetest?: TypeTest,
        public campagne?: Campagne,
    ) {
    }
}
