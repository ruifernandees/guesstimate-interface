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
  const [isEditor, setIsEditor] = useState(false);
  const [rawContentFromTextArea, setRawContentFromTextArea] = useState('IF fact THEN consequence');

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
      setKnowledgeDatabase(initialKnowledgeDatabase);
      setRawContentFromTextArea(initialKnowledgeDatabase.raw);
    };
    reader.readAsText(file);
  }

  function handleGo() {
    if (!knowledgeDatabase) {
      handleError('Informe uma base de conhecimento!');
      return;
    }
    if (isEditor) {
      const initialKnowledgeDatabase = parseFileContentToKnowledgeDatabase(rawContentFromTextArea);
      setKnowledgeDatabase(initialKnowledgeDatabase);
      console.log('🧠', initialKnowledgeDatabase);
      handleSuccess('Base reconhecida com sucesso!');
      navigate('/inference');
      return;
    }
    console.log('👨‍💻', knowledgeDatabase);
    handleSuccess('Base reconhecida com sucesso!');
    navigate('/inference');
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-center text-blue text-2xl font-black">
        Guesstimate
      </h1>
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => setIsEditor(true)}
          className={`flex items-center justify-center ${isEditor ? 'bg-blue-400 text-white' : 'bg-gray-100'} w-100 h-10 p-2`}
        >
          Editor de BC
        </button>
        <button
          onClick={() => setIsEditor(false)}
          className={`flex items-center justify-center ${!isEditor ? 'bg-blue-400 text-white' : 'bg-gray-100'} w-100 h-10 p-2`}
        >
          Upload da BC
        </button>
      </div>
      {
        isEditor
          ? <textarea className="bg-gray-200 border-black border-spacing-2 w-96 h-44 m-5" onChange={(event) => {
            console.log(event.target.value);
            setRawContentFromTextArea(event.target.value);
          }}
          value={rawContentFromTextArea } />

          : <Dropzone
        onFileUploaded={handleFileUploaded}
      />
      }

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
