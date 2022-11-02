/* eslint-disable arrow-body-style */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { LogicalConstant, TruthyValue } from './logical-constant';
import { LogicalRule } from './logical-rule';

export class Facts {
  readonly allLogicalConstants: LogicalConstant[] = [];

  constructor(
    logicalRules: LogicalRule[],
  ) {
    this.buildFactsFromLogicalRules(logicalRules);
  }

  buildFactsFromLogicalRules(logicalRules: LogicalRule[]) {
    for (const rule of logicalRules) {
      const allLogicalConstants = [...rule.ifLogicalConstants, ...rule.thenLogicalConstants];
      for (const constant of allLogicalConstants) {
        const isOnAllLogicalConstants = this.allLogicalConstants.find((item) => {
          return item.symbol === constant.logicalConstant;
        });
        if (isOnAllLogicalConstants) continue;
        this.allLogicalConstants.push(new LogicalConstant(constant.logicalConstant));
      }
    }
  }
}
