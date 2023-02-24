export interface IArticle {
  id: string;
  title: string;
}

export interface IArticleParams {
  limit: number;
  offset: number;
  orders: string;
  filters: string;
}

export const DEFAULT_ARTICLE_PARAMS: IArticleParams = {
  limit: 10,
  offset: 0,
  orders: "",
  filters: "",
};

export interface IListResponse<T> {
  contents: T[];
  limit: number;
  offset: number;
  totalCount: number;
}

export interface IFetchService<T> {
  data: T;
  isLoading: boolean;
  error?: Error;
}
