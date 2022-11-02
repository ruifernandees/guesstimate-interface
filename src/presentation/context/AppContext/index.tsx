import React, { createContext, useState } from 'react';
import { KnowledgeDatabase } from '../../../domain/entities/knowledge-database';
import { IAppContextProps } from './props';

const AppContext = createContext<IAppContextProps>({} as IAppContextProps);

const AppProvider: React.FC = ({ children }) => {
  const [knowledgeDatabase, setKnowledgeDatabase] = useState<KnowledgeDatabase>();

  return (
      <AppContext.Provider
          value={{
            knowledgeDatabase,
            setKnowledgeDatabase,
          }}
      >
          {children}
      </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
