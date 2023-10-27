import { MoviesRequest, SortBy, SortOrder } from '@models/Movie';

export function prepareRequestParams(search: string, sortBy: SortBy, sortOrder: SortOrder, limit: number, page: number, genre: string): MoviesRequest {
  return {
    search,
    searchBy: 'title',
    sortBy: sortBy,
    sortOrder: sortOrder,
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
    filter: genre !== 'All' ? genre : ''
  }
}
