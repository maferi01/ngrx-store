import { InjectionToken } from '@angular/core';
import { StateOptions } from './models';

export enum VISIBILITY_FILTER {
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_ALL = 'SHOW_ALL',
}

export type TodoFilter = {
  label: string;
  value: VISIBILITY_FILTER;
};

export const initialFilters: TodoFilter[] = [
  { label: 'All', value: VISIBILITY_FILTER.SHOW_ALL },
  { label: 'Completed', value: VISIBILITY_FILTER.SHOW_COMPLETED },
  { label: 'Active', value: VISIBILITY_FILTER.SHOW_ACTIVE },
];

export enum ActionList {
  LOAD = 'load',
  FILTER = 'filter',
  PAGE = 'pagination',
  ORDER = 'order',
  REFRESH = 'REFRESH',
  DELETE = 'delete',
  DELETE_ROWS = 'delete_rows',
  UPDATE = 'update',
  ADD = 'add',
}

export interface PageInfo {
  /** The current page index. */
  pageIndex?: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;
  /** The current page size */
  pageSize?: number;
  /** The current total number of items being paged */
  length?: number;
}

export interface PageInfo {
  requestLink?: 'first' | 'last' | 'prev' | 'next';
  linkInfo?: {
    linkNext: string;
    linkPrev: string;
    linkLast: string;
    linkFisrt: string;
  };
}

export interface SortInfo {
  /** The id of the column being sorted. */
  active: string;
  /** The sort direction. */
  direction: 'asc' | 'desc' | '';
}

export interface ResultList<E> {
  rows: E[];
  pageInfo: PageInfo;
}

export interface FilterList<F = any> {
  filter?: F;
  order?: SortInfo;
  page?: PageInfo;
}

export const OPTIONS_STATE_LIST = new InjectionToken<StateOptions>('options_state_list');

export interface StateListFilter<D,E=any> {
  ui: {
    expandFilter?: boolean;
  };
  filterList: FilterList;
  selectionRows?:E[];
  extraData: D;
}
