export type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    count: number
}

export type FetchPizzasArgs = {
    currentPage: number,
    itemsOnPage: number,
    sortBy: string,
    category: number | string,
    search: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: PizzaItem[];
    itemsOnPage: number;
    pageCount: number
    status: Status
}