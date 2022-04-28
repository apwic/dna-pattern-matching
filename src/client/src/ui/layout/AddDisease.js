import { Button, FormControl,Input, Box, Flex, Spacer, Heading, Image, position, VStack, HStack, Badge } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import './DNATest.css'
import DiseaseForm from "./DiseaseForm";
import disease from '../../assets/disease.png'
import apiClient from "../../http-common.js";
import { useRef } from "react";
import * as FaIcons from 'react-icons/fa';
import dispage from '../../assets/dispage.png';

function AddDiseasePage(){
  const initialValue = {namapenyakit : "", sekuens: ""};
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const hiddenFileInput = useRef(null);
  const [filename, setFilename] = useState('Choose File');

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  }

  const handleUpload = event => {
    const pattern = /^[ACGT]+$/g;
    const fileUploaded = event.target.files[0];
    const filename = fileUploaded.name;
    setFilename(filename);
    setFormValues({...formValues, filename: fileUploaded.name})
    // const filename = fileUploaded.name;
    const reader = new FileReader();
    const formData = new FormData();

    formData.append('file', fileUploaded);

    reader.readAsText(fileUploaded);
    reader.onload = () => {
      let result = reader.result.match(pattern);
      if (result != null && result[0].length == reader.result.length){
        setFormValues({...formValues, sekuens: reader.result})
        console.log(reader.result);
      } else {
        alert("DNA sequence must be only A, C, G, T");
      }
    }

    reader.onerror = () => {
      console.log(reader.error);
    //   hasFileError = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    createDisease(e);
  };

  async function createDisease(e) {
    try{
      const response = await apiClient.post('penyakit/create-penyakit', formValues);
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };
      const data = result.data;
      return data;
    } catch (err) {
      console.log(err.response?.data || err);
    }
  }

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    if (!values.namapenyakit) {
        errors.namapenyakit = "Disease name is required";
    }
    if (!values.sekuens) {
        errors.sekuens = "file is required";
    }
    return errors;
  }
  return(
    <VStack>
      <Flex align="center" justify="center" style={{height : "20vh", width : "93.3vw", marginLeft : "5vw"}}>
          <Box>
            <Image boxSize='100%' src={dispage} alt="logo"/>
          </Box>
      </Flex>
      <Box backgroundColor={"#E1E5F1"} marginLeft="7vw" borderRadius="15pt" >
        <HStack p='50'>
            <VStack marginLeft="7vw">
                  <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} letterSpacing="0.5pt">
                      Disease Name
                    </Box>
                    <FormControl isRequired>
                        <Input name='namapenyakit'  placeholder='Input disease name here' value={formValues.namapenyakit}
                        onChange = {handleChange}
                        backgroundColor="white"
                        border="2px solid #012B39"
                        borderRadius={"5pt"}
                        width = "100%"
                        minWidth = "20vw"
                        maxWidth = "20vw"
                        />
                        
                    </FormControl>
                    <Badge variant="solid" colorScheme='red'>{formErrors.namapenyakit}</Badge>
            </VStack>
            <VStack px = '10' marginLeft={"10vw"} marginRight={"10vw"}>
              <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} marginLeft="2vh" letterSpacing="0.5pt">
                      DNA Sequence
                    </Box>
                    <Flex>
                        <Box style={{padding:"5pt 0 0 5pt", marginLeft:"5vw", marginTop:"5pt", border: "1px", width:"100%", minWidth:"17vw", maxWidth:"17vw", height:"100%", minHeight:"6vh", maxHeight:"6vh", backgroundColor:"white", borderRadius:"5pt", textAlign:"center"}} className="file-label" htmlFor='customFile'>
                                {filename}
                        </Box>
                      <Button onClick={handleClick} marginTop="1vh" colorScheme={"blue"}>
                        <FaIcons.FaUpload size={"100%"} />
                      </Button>
                        <FormControl isRequired>
                            {/* <Input name='dnaSequence' placeholder='First name' value={formValues.dnaSequence} onChange = {handleChange}/> */}
                            <input type="file"
                            accept=".txt"
                            ref={hiddenFileInput}
                            id="customFile"
                            onChange={handleUpload}
                            style={{display:'none'}}
                            />
                            
                        </FormControl>
                  
                    </Flex>
                    <Badge variant="solid" colorScheme='red'>{formErrors.sekuens}</Badge>
                    
            </VStack>
      </HStack>
      <Button marginLeft={"32.5vw"} marginBottom={"5vh"} colorScheme='blue' marginTop={"3vh"} borderRadius={"15pt"} backgroundColor="#91ACCA" type= 'submit' onClick={handleSubmit}>Submit</Button>
      </Box>
    </VStack>
  );
}

export default AddDiseasePage;