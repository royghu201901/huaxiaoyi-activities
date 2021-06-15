export type TableListItem = {
  key: number;
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
  time?: string;
  price?: string;
  store?: number;
  usersNum?: number;
  editorState?: string;
};
