/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { rulesParser } from 'guesstimate-engine';
import { Dropzone } from '../../components/Dropzone';
import { LogicalRule } from '../../../domain/entities/logical-rule';
import { AppContext } from '../../context/AppContext';
import { KnowledgeDatabase } from '../../../domain/entities/knowledge-database';
import { parseFileContentToKnowledgeDatabase } from '../../../domain/parsers/parseFileContentToKnowledgeDatabase';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { knowledgeDatabase, setKnowledgeDatabase } = useContext(AppContext);

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored',
    });
  }

  function handleSuccess(name: string) {
    toast.success(name, {
      theme: 'colored',
    });
  }

  function handleFileUploaded(file: any) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result?.toString() || '';
      const initialKnowledgeDatabase = parseFileContentToKnowledgeDatabase(fileContent);
      console.log(fileContent, initialKnowledgeDatabase);
      setKnowledgeDatabase(initialKnowledgeDatabase);
    };
    reader.readAsText(file);
  }

  function handleGo() {
    if (!knowledgeDatabase) {
      handleError('Informe uma base de conhecimento!');
      return;
    }
    handleSuccess('Base reconhecida com sucesso!');
    navigate('/inference');
    console.log('OK');
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-center text-blue text-2xl font-black">
        Guesstimate
      </h1>
      <Dropzone
        onFileUploaded={handleFileUploaded}
      />
      <button
        className="h-10 px-6 w-300 mb-3 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
        onClick={handleGo}
      >
        {
          isLoading
            ? <ReactLoading type="spin" color="white" height={24} width={24} />
            : <p>Continuar</p>
        }
      </button>
      <button
        className="h-10 px-6 w-300 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white"
        onClick={() => navigate('/about')}
      >
        Sobre
      </button>
    </div>
  );
};

export default Home;
