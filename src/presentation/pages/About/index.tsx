import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '../../assets/icons/ArrowBackIcon';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className='flex items-center justify-center'>
        <ArrowBackIcon
          className="cursor-pointer"
          size={24}
          onClick={() => navigate('/')}
        />
        <h1 className='ml-2 text-center text-blue text-2xl font-black'>Guesstimate</h1>
      </div>

      <a
        className="h-10 px-6 w-300 mb-3 flex justify-center items-center font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white"
        href="https://github.com/ruifernandees"
        target="_blank"
        rel="noreferrer"
      >
        {/* <GithubIcon size={24} color="#FFF" /> */}
        <p className="ml-2">Rui Fernandes</p>
      </a>
      <a
        className="h-10 px-6 w-300 mb-3 flex justify-center items-center font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in text-white"
        href="https://github.com/PedroAugustoACT"
        target="_blank"
        rel="noreferrer"
      >
        {/* <LinkedInIcon size={24} color="#FFF" /> */}
        <p className="ml-2">Pedro Augusto</p>
      </a>
    </div>
  );
};

export default About;
