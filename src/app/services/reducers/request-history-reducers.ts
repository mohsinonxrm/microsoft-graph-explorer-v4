import { IAction } from '../../../types/action';
import { IHistoryItem } from '../../../types/history';
import {
  ADD_HISTORY_ITEM_SUCCESS,
  REMOVE_ALL_HISTORY_ITEMS_SUCCESS,
  REMOVE_HISTORY_ITEM_SUCCESS
} from '../redux-constants';

export function history(state: any[] = [], action: IAction): any {
  switch (action.type) {
    case ADD_HISTORY_ITEM_SUCCESS:
      let historyItems = [...state, action.response];
      historyItems = historyItems.reduce((current, compare) => {
        return current.findIndex((historyItem: IHistoryItem) => {
          return historyItem.createdAt === compare.createdAt;
        }) < 0 ? [...current, compare] : current;
      }, []);

      return historyItems;

    case REMOVE_HISTORY_ITEM_SUCCESS:
      return state.filter(historyItem => historyItem !== action.response);

    case REMOVE_ALL_HISTORY_ITEMS_SUCCESS:
      const historyItemsToDelete: any = action.response;
      return state.filter((historyItem: IHistoryItem) => !historyItemsToDelete.includes(historyItem.createdAt));

    default:
      return state;
  }
}
