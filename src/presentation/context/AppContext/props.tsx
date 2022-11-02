/* eslint-disable no-unused-vars */
import { KnowledgeDatabase } from '../../../domain/entities/knowledge-database';

export interface IAppContextProps {
  knowledgeDatabase: KnowledgeDatabase | undefined;
  setKnowledgeDatabase: (params: KnowledgeDatabase) => void;
}
