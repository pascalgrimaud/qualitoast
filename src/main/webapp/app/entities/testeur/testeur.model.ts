import { BaseEntity } from './../../shared';

export class Testeur implements BaseEntity {
    constructor(
        public id?: number,
        public identifiant?: string,
        public nom?: string,
        public prenom?: string,
        public typetest?: BaseEntity,
        public campagnes?: BaseEntity[],
    ) {
    }
}
