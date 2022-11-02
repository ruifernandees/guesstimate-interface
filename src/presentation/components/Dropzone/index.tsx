import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { DropzoneProps } from './props';

import './styles.css';

export const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
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

            { selectedFileUrl
              ? (
                <p>
                  {selectedFileName}
                </p>
              )
              : (
                <p>
                    <FiUpload />
                    Base de Conhecimento
                </p>
              )
            }

        </div>
  );
};
