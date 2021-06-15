export type TableListItem = {
  key: number;
  storeName?: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  key: number;
  index?: number;
  storeId?: number;
  storeName?: string;
  storeImg?: string;
}
