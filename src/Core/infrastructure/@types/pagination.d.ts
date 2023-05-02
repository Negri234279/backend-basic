export interface Pagination<T> {
    data: T[]
    count: number
}

export interface PaginationRes<T> {
    data: T[]
    count: number
    currentPage: number
    totalPages: number
}
