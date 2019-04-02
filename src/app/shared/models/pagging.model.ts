export class Pagging {
    constructor(perPage: number = 20) {
        this.itemsPerPage = perPage;
    }

    totalItems: number = 0;
    itemsPerPage: number = 20;
    currentPage: number = 1;
}
