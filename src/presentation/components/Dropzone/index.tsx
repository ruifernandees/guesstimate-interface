import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { DropzoneProps } from './props';

import './styles.css';

export const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    setSelectedFileName(file.name);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt'],
    },
  });

  return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            <p>
              <FiUpload />
              {selectedFileName || 'Base de Conhecimento'}
            </p>
        </div>
  );
};
