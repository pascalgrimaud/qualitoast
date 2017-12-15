import { BaseEntity } from './../../shared';

export class TypeTest implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
    ) {
    }
}
