import {RootState} from "../../store";

export const filterSelector = (state: RootState) => state.filter;

export const filterSelectorSort = (state: RootState) => state.filter.sort;