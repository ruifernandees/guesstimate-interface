/* eslint-disable arrow-body-style */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  backchaining, hybridChaining, forwardChaining,
} from 'guesstimate-engine';
import { AppContext } from '../../context/AppContext';
import { parseConstantObjectsToString } from '../../helpers/parseConstantObjectsToString';
import ArrowBackIcon from '../../assets/icons/ArrowBackIcon';

export type Threads = 'Encadeamento para trás' | 'Encadeamento para frente' | 'Encadeamento misto'

const ThreadsMapper: {[key: string]: any} = {
  'Encadeamento para trás': backchaining,
  'Encadeamento para frente': forwardChaining,
  'Encadeamento misto': hybridChaining,
};

export const Inference: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSetThreadType, setThreadType] = useState('Encadeamento para trás');
  const [toggleDB, setToggleDB] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>();
  const [usedFacts, setUsedFacts] = useState<Array<string>>([]);

  const navigate = useNavigate();

  const { knowledgeDatabase, setKnowledgeDatabase } = useContext(AppContext);

  const initialFacts = knowledgeDatabase?.getFacts().simpleFactsObjects;
  const [facts, setFacts] = useState(initialFacts);

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

  function handleSuccess(message: string) {
    toast.success(message, {
      theme: 'colored',
    });
  }

  const changeThreadsTypeHandler = (value: Threads) => {
    setThreadType(value);
    console.log(value);
  };

  function handleDeduction(): string {
    if (!facts) return '';
    if (!knowledgeDatabase?.logicalRules) return '';
    const booleanFacts: {[key: string]: boolean} = {};
    Object.keys(facts).forEach((fact) => {
      if (facts[fact] !== undefined) {
        booleanFacts[fact] = facts[fact] as boolean;
      }
    });
    let answer = '';
    knowledgeDatabase.targets.every((target) => {
      const result = ThreadsMapper[isSetThreadType](
        booleanFacts,
        knowledgeDatabase.logicalRules as any,
        target,
      );
      if (result) {
        answer = target;
        return false;
      }
      return true;
    });
    return answer;
  }

  useEffect(() => {
    if (!knowledgeDatabase) {
      navigate('/');
    }
    if (facts) {
      setCurrentFact(Object.keys(facts)[0]);
    }
  }, []);

  function handleNextFact(providedFact: string, value?: boolean) {
    const updatedFacts = { ...facts, [providedFact]: value };
    const updateUsedFacts = [...usedFacts, providedFact];
    setFacts(updatedFacts);
    setUsedFacts(updateUsedFacts);
    const answer = handleDeduction();
    if (answer) {
      handleSuccess(`É um(a) ${answer}`);
      setFinished(true);
      return;
    }

    const nextFact = Object.keys(updatedFacts).find((fact: string) => {
      return updatedFacts[fact] === undefined && !updateUsedFacts.includes(fact);
    });
    console.log(nextFact);
    if (!nextFact) {
      handleError('Não consegui deduzir!');
      setFinished(true);
      return;
    }
    setCurrentFact(nextFact);
  }

  function handleReset() {
    if (!facts) return;
    setCurrentFact(Object.keys(facts)[0]);
    setUsedFacts([]);
    setFacts(initialFacts);
    setFinished(false);
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <div className="flex flex-col mb-10  justify-center">
      <div className='flex items-center justify-center'>
        <ArrowBackIcon
          className="cursor-pointer"
          size={24}
          onClick={() => navigate('/')}
        />
        <h1 className='ml-2 text-center text-blue text-2xl font-black'>Guesstimate</h1>
      </div>

        <h2 className="text-center text-blue text-xl font-medium" onClick={handleReset}>
          Base de dados: {knowledgeDatabase?.name}
        </h2>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentFact && (() => {
                        const currentRulePosition = currentFact + 1;
                        const factWithoutUnderline = currentFact.replace('_', ' ');
                        const factFirstChar = factWithoutUnderline[0].toUpperCase();
                        const factNaturalLanguage = factFirstChar + factWithoutUnderline.slice(1);
                        return <tr className="border-b flex flex-col justify-center items-center" key={currentRulePosition}>

                          {finished ? <button
                            className='h-10 px-6 w-250 mb-3 flex justify-center items-center font-semibold rounded-md bg-blue-500 hover:bg-blue-400 transition-all ease-in text-white'
                            onClick={handleReset}
                          >
                            Refazer
                          </button>
                            : <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${factNaturalLanguage}?`}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                            <div className='flex flex-col'>
                              <div className="">
                                <button
                                  className='h-10 px-6 w-250 mb-3 flex justify-center items-center font-semibold rounded-md bg-green-500 hover:bg-green-400 transition-all ease-in text-white'
                                  onClick={() => {
                                    handleNextFact(currentFact, true);
                                  }}
                                >
                                 Sim
                                </button>
                              </div>
                              <div>
                              <button
                                  className='h-10 px-6 w-250 mb-3 flex justify-center items-center font-semibold rounded-md bg-red-500 hover:bg-red-400 transition-all ease-in text-white'
                                  onClick={() => {
                                    handleNextFact(currentFact, false);
                                  }}
                                >
                                 Não
                                </button>
                              </div>
                              <div>
                                <button
                                  className='h-10 px-6 w-250 mb-3 flex justify-center items-center font-semibold rounded-md bg-gray-500 hover:bg-gray-400 transition-all ease-in text-white'
                                  onClick={() => {
                                    handleNextFact(currentFact, undefined);
                                  }}
                                >
                                  Não sei
                                </button>
                              </div>
                            </div>
                          </td>
                            </>
                            }
                        </tr>;
                      })()
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        <h1 className="text-center text-blue text-2xl font-black">
          Recursos Avançados
        </h1>
        <button
          className='min-h-20 px-6 w-250 mb-3 flex justify-center self-center items-center font-semibold rounded-md bg-black hover:bg-white border-2 hover:border-black hover:text-black transition-all ease-in text-white'
          onClick={() => setToggleDB((previous) => !previous)}
        >
          {toggleDB ? 'Esconder' : 'Mostrar'}
        </button>
        {
          toggleDB && <div className="flex flex-col">
            <div className='flex flex-col justify-center items-center mt-3'>
                  <div>
                    <select className='h-10 px-4 w-200 mb-3 flex justify-center items-center font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white text-center'
                    value={isSetThreadType}
                    onChange={(e) => changeThreadsTypeHandler(e.target.value as Threads)}>
                      {threadsTypes.map((thread: Threads) => (
                        <option value={thread} key={thread}>
                          {thread}
                        </option>
                      ))};
                    </select>
                  </div>

            </div>
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
        }
    </div>
  );
};
