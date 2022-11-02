/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
export interface ILogicalConstantInLogicalRule {
  logicalConstant: string;
  isPositive: boolean;
}

export class LogicalRule {
  constructor(
    public ifLogicalConstants: ILogicalConstantInLogicalRule[],
    public thenLogicalConstants: ILogicalConstantInLogicalRule[],
  ) {}
}
