export interface SearchResult {
    collection: {};
    data: Array<any>;
}

export interface CarQueryManufacturer{
    id: number;
    name: string;
    
}

export interface CarQueryModel {
    id: number;
    make_id: number;
    name: string;
    make: {
        id: number,
        name: string,
    }
}

export interface CarModelInfo {
    name: string,
    listYears: number[],
}

export interface CarInfo {
    idManufacterer: number;
    manufacterer: string;
    listModels: CarModelInfo[] | null;
}