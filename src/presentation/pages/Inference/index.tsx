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

export type Threads = 'Encadeamento para trás' | 'Encadeamento para frente' | 'Encadeamento misto'

export const Inference: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { knowledgeDatabase, setKnowledgeDatabase } = useContext(AppContext);

  const threadsTypes: Threads[] = [
    'Encadeamento para trás',
    'Encadeamento para frente',
    'Encadeamento misto',
  ];

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
    <div className="flex flex-col items-center w-screen h-screen">
      <div>
        <select className='h-10 px-6 w-220 mb-3 flex justify-center items-center font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white'>
          {threadsTypes.map((thread: Threads) => (
            <option value={thread} key={thread}>
              {thread}
            </option>
          ))};
        </select>
      </div>
      <div className="flex flex-col mb-10  justify-center">
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
        <h1 className="text-center text-blue text-2xl font-black">
          Fatos
        </h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Propriedade
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      knowledgeDatabase?.getFacts().allLogicalConstants.map((constant, index) => {
                        const currentRulePosition = index + 1;
                        return <tr className="border-b" key={currentRulePosition}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{constant.symbol}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                            <div className='flex flex-col'>
                              <div className="">
                                <input
                                  type="radio"
                                  value="YES"
                                  id={`YES-${constant.symbol}`}
                                  name={`truthy-${constant.symbol}`}
                                />
                                <label
                                  className='ml-2 font-normal text-[16px]'
                                  htmlFor={`YES-${constant.symbol}`}
                                >Sim</label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  value="NO"
                                  id={`NO-${constant.symbol}`}
                                  name={`truthy-${constant.symbol}`}
                                />
                                <label
                                  className='ml-2 font-normal text-[16px]'
                                  htmlFor={`NO-${constant.symbol}`}
                                >Não</label>
                              </div>
                            </div>
                          </td>
                        </tr>;
                      })
                    }
                  </tbody>
                </table>
                <div className='flex justify-center items-center mt-3'>
                  <button className='h-10 px-6 w-250 mb-3 flex justify-center items-center font-semibold rounded-md bg-green-700 hover:bg-green-600 transition-all ease-in text-white'>
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
