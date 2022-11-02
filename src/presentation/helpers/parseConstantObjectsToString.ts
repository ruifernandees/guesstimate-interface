import { ILogicalConstantInLogicalRule, LogicalRule } from '../../domain/entities/logical-rule';

export function parseConstantObjectsToString(rule: LogicalRule) {
  const reduceCallback = (previous: string, current: ILogicalConstantInLogicalRule) => `${previous && `${previous} &`} ${!current.isPositive ? '~' : ''}${current.logicalConstant}`;
  const ifConstants = rule.ifLogicalConstants.reduce(reduceCallback, '');
  const thenConstants = rule.thenLogicalConstants.reduce(reduceCallback, '');
  return { ifConstants, thenConstants };
}
