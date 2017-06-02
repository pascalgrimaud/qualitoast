export class Application {
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
