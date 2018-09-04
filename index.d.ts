export type Change<S, M> = [S, Effect<M>?];

export interface Effect<M> {
  (dispatch: Dispatch<M>): void;
}

export interface Update<M, S> {
  (message: M, state: S): Change<S, M>;
}

export interface View<M, S, V> {
  (state: S, dispatch: Dispatch<M>): V;
}

export interface Dispatch<M> {
  (message: M): void;
}

export interface Done<S> {
  (state: S): void;
}

export interface Program<S, M, V> {
  readonly init: Change<S, M>;
  readonly update: Update<M, S>;
  readonly view: View<M, S, V>;
  readonly done?: Done<S>;
}

export function runtime<S, M, V>(program: Program<S, M, V>): void;
