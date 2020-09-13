import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

import { OrdersMap } from '../models';
import { CloseTable, OpenTable } from './actions';

type OrdersStateModel = OrdersMap;

type LocalStateModel = OrdersStateModel;
type LocalStateContext = StateContext<LocalStateModel>;

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {},
})
@Injectable()
export class OrdersState {
  @Selector()
  static orders(state: LocalStateModel): OrdersStateModel {
    return state;
  }

  @Action(OpenTable)
  protected openTable(ctx: LocalStateContext, action: OpenTable): void {
    const { tableName } = action;
    ctx.setState(
      patch<LocalStateModel>({
        [tableName]: { tableName, choices: [], persons: null },
      })
    );
  }

  @Action(CloseTable)
  protected closeTable(ctx: LocalStateContext, action: CloseTable): void {
    const { tableName } = action;
    ctx.setState(
      patch<LocalStateModel>({
        [tableName]: null,
      })
    );
  }
}