import { Box } from '@chakra-ui/react';
import React ,{useState, Fragment} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
    background-color: #FFFFF;
    border-radius: 13px;
    border: 2px solid #91ACCA;
    text-align: center;
    font-size: 1em;
    margin: 4px 3px;
  `;

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const filename = fileUploaded.name;
    const formData = new FormData();
    formData.append('file', fileUploaded);

    setFile(fileUploaded);
    setFilename(event.target.files[0].name);
    setUploadedFile({filename, fileUploaded});

    props.handleFile(fileUploaded);
  };

  return (
    <Fragment>
      <label style={{border: "1px"}} className="file-label" htmlFor='customFile'>
        {filename}
      </label>
      <Button onClick={handleClick}>
        Upload
      </Button>
      <input type="file"
             accept=".txt"
             ref={hiddenFileInput}
             id="customFile"
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </Fragment>
  );
};
export default FileUploader;