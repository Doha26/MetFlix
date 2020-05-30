export interface SearchreducerType {
    query: string,
    searching: boolean,
    has_results: boolean,
    search_results: any[] ,
    search_canceled: boolean
}
