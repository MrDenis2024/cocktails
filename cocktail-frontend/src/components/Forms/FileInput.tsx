import React, {useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<Props> = ({onChange}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {pathname: location} = useLocation();

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  return (
    <div className='form-group mb-4'>
      <div className='d-flex flex-column'>
        <input type='file' style={{display: 'none'}} ref={inputRef} name={location === '/register' ? 'avatar' : 'image'} onChange={onFileChange} />
        <div className='mb-1'>
          <label htmlFor="image">{location === '/register' ? ('Avatar') : ('Image')}</label>
        </div>
        <div className='d-flex'>
          <input type="text" id="image" className={`form-control ${location === '/register' ? '' : 'w-25'}`} value={filename} onClick={activateInput} onChange={onFileChange} required/>
          <button type='button' className='btn btn-primary ms-5' onClick={activateInput}>Browse</button>
        </div>
      </div>
    </div>
  );
};

export default FileInput;