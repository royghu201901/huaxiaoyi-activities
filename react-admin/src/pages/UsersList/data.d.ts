export type TableListItem = {
  key: number;
  usersNote?: string;
  status?: number;
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
  // status?: number;
  // name?: string;
  // desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  // filter?: Record<string, any[]>;
  // sorter?: Record<string, any>;
  usersId?: number;
  usersName?: string;
  mobile?: string;
  time?: string;
  address?: string;
  storeName?: string;
};
