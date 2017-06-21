import { BaseEntity } from './../../shared';

export class Campagne implements BaseEntity {
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
        public application?: BaseEntity,
        public typetest?: BaseEntity,
        public resultat?: BaseEntity,
        public testeurs?: BaseEntity[],
    ) {
        this.termine = false;
    }
}
