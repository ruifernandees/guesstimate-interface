/* eslint-disable no-shadow */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
export enum TruthyValue {
  UNKNOWN = 'UNKNOWN',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

export class LogicalConstant {
  public isTruthy: TruthyValue;

  constructor(
    public symbol: string,
    isTruthy?: TruthyValue,
  ) {
    if (!isTruthy) {
      this.isTruthy = TruthyValue.UNKNOWN;
      return;
    }
    this.isTruthy = isTruthy;
  }
}
