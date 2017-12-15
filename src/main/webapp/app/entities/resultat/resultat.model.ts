import { BaseEntity } from './../../shared';

export class Resultat implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
    ) {
    }
}
