/* eslint-disable arrow-body-style */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { Facts } from './facts';
import { LogicalRule } from './logical-rule';

export class KnowledgeDatabase {
  readonly facts: Facts;

  constructor(
    readonly logicalRules: LogicalRule[],
    readonly targets: string[],
  ) {
    this.facts = new Facts(logicalRules);
  }

  getFacts() {
    return this.facts;
  }

  getRules() {
    return this.logicalRules;
  }
}
