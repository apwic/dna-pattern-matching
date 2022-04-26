import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
import React ,{useState, Fragment} from 'react';
import styled from 'styled-components';

// Style Button
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
    background-color: #012B39;
    border-radius: 13px;
    padding: 5px;
    border: 2px solid #012B39;
    text-align: center;
    text-color: #FFFFFF;
    font-size: 10pt;
    font-weight: bold;
    letterSpacing: 2pt;
    color: #FFFFFF;
    margin: 4px 3px;
  `;


const FileUploader = props => {

  const hiddenFileInput = React.useRef(null);
  const [setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [setUploadedFile] = useState({});

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
      <Flex>
        {/** Label Penulisan (ini masih perlu dibenerin) */}
        <label style={{marginTop:"5pt", border: "1px", width:"100%", minWidth:"15vw", maxWidth:"15vw", height:"100%", minHeight:"1vh", maxHeight:"1vh"}} className="file-label" htmlFor='customFile'>
          {filename}
        </label>

        {/** Button Upload */}
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
      </Flex>

    </Fragment>
  );
};

export default FileUploader;