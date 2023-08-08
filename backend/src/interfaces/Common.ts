export interface Filter {
  limit?: number;
  perPage?: number;
  currentPage?: number;
}

export type SuccessObject = {
  data?: any;
  message?: string;
};

export type ErrorObject = {
  data?: any;
  code?: number;
  error?: string;
};
