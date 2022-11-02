/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { rulesParser } from 'guesstimate-engine';
import { Dropzone } from '../../components/Dropzone';
import { LogicalRule } from '../../../domain/entities/logical-rule';
import { AppContext } from '../../context/AppContext';
import { KnowledgeDatabase } from '../../../domain/entities/knowledge-database';
import { parseConstantObjectsToString } from '../../helpers/parseConstantObjectsToString';

export const Inference: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { knowledgeDatabase, setKnowledgeDatabase } = useContext(AppContext);

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored',
    });
  }

  function handleSuccess(name: string) {
    toast.success(`Hi, ${name}!`, {
      theme: 'colored',
    });
  }

  useEffect(() => {
    if (!knowledgeDatabase) {
      navigate('/');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <header >
      </header>
      <div className="flex flex-col mb-10 w-250 sm:w-350 justify-center">
        <h1 className="text-center text-blue text-2xl font-black">
          Base de Conhecimento
        </h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Regra
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Se
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Então
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    knowledgeDatabase?.getRules().map((rule, index) => {
                      const { ifConstants, thenConstants } = parseConstantObjectsToString(rule);
                      const currentRulePosition = index + 1;
                      return <tr className="border-b" key={currentRulePosition}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{currentRulePosition}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{ifConstants}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{thenConstants}</td>
                    </tr>;
                    })
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center text-blue text-2xl font-black mt-10">
          Informações
        </h1>
      </div>
    </div>
  );
};
