export interface IPaginated<T> {
    data: T[]
    count: number
}

export interface IPaginatedRes<T> {
    data: T[]
    count: number
    currentPage: number
    totalPages: number
}
