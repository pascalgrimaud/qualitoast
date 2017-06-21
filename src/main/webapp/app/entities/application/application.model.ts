import { BaseEntity } from './../../shared';

export class Application implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
        public description?: string,
        public priority?: boolean,
    ) {
        this.priority = false;
    }
}
