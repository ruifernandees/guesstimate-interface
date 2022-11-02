import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored'
    });
  }

  function handleSuccess(name: string) {
    toast.success(`Hi, ${name}!`, {
      theme: 'colored'
    });
  }
 
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-center text-blue text-2xl font-black">
        Guesstimate
      </h1>
      <div className="group relative w-300">
        <input 
          type="text" 
          className="focus:ring-2 w-full focus:ring-blue-500 focus:outline-none my-10 text-gray-900 leading-6 placeholder-gray-400 rounded-md py-2 pl-10 ring-1 ring-gray-500 shadow-sm"
          placeholder='Content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <button 
        className="h-10 px-6 w-300 mb-3 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
        onClick={() => {}}
      >
        {
          isLoading
          ?
          <ReactLoading type="spin" color="white" height={24} width={24} />
          :
          <p>Go</p>
        }
      </button>
      <button 
        className="h-10 px-6 w-300 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white"
        onClick={() => navigate('/about')}
      >
        About
      </button>
    </div>
  )
}

export default Home;