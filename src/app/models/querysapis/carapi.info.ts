export interface CarManufacturer {
    id: number
    name: string;
}

export interface CarModel {
    id: number;
    name: string;
    make_id: number;
}

export interface CarYear {
    year: number;
}

export interface CarColor {
    id: number;
    make_mode_trim_id: number;
    name: string;
}

export interface CarDoor {
    year: number;
}

export interface ResultCarAPI {
    context: {};
    data: [];
}

export interface ResultNinjaAPI {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}