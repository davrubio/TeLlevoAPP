export interface SearchResults {
    results: Array<object>;
    total: number;
}

export interface Manufacturer{
    num_models: number;
    img_url: string;
    max_car_id: number;
    id: number;
    name: string;
    avg_horsepower: number;
    avg_price: number;
}