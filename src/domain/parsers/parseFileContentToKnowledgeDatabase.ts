/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { rulesParser } from 'guesstimate-engine';
import { KnowledgeDatabase } from '../entities/knowledge-database';
import { LogicalRule } from '../entities/logical-rule';

const removeBlankSpaces = (text: string) => text.trim() !== '';

const removeLineBreak = (text: string) => text.replaceAll('\n', '').replaceAll('\r', '');

export enum FileContentSeparator {
  TARGETS = 'TARGETS:',
  RULES = 'RULES:',
  NAME = 'NAME:',
}

const lineBreak = '\n';

export function parseFileContentToKnowledgeDatabase(fileContent: string): KnowledgeDatabase {
  const [restRaw, targetsRaw] = fileContent.split(FileContentSeparator.TARGETS);
  const [rawDbName, rulesRaw] = restRaw.split(FileContentSeparator.RULES);
  const rulesWithoutBlankSpaces = rulesRaw
    .split(lineBreak)
    .filter(removeBlankSpaces)
    .map(removeLineBreak)
    .join(lineBreak);
  const rules = rulesParser(rulesWithoutBlankSpaces) as LogicalRule[];
  const targets = targetsRaw
    .split(lineBreak)
    .filter(removeBlankSpaces)
    .map(removeLineBreak);
  const dbName = rawDbName.replace(FileContentSeparator.NAME, '');
  return new KnowledgeDatabase(rules, targets, dbName);
}
