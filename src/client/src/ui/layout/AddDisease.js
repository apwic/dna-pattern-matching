import { Button, FormControl,Input, Box, Flex, Spacer, Heading, Image, position, VStack, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import './DNATest.css'
import DiseaseForm from "./DiseaseForm";
import disease from '../../assets/disease.png'
import apiClient from "../../http-common.js";

function AddDiseasePage(){
  const initialValue = {namapenyakit : "", sekuens: ""};
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  }

  const handleUpload = event => {
    const pattern = /^[ACGT]+$/g;
    const fileUploaded = event.target.files[0];
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
      <Box bg='#91ACCA' w='100%' h='140'  color='moon'>
      <Heading textAlign='center' p='50'>
        Add Disease
      </Heading>
      </Box>
      <HStack p='50'>
            <VStack>
                <Heading>
                    Disease
                </Heading>
                    <FormControl isRequired>
                        <Input name='namapenyakit'  placeholder='Input disease name here' value={formValues.namapenyakit}
                        onChange = {handleChange}
                        />
                        <p>{formErrors.namapenyakit}</p>
                    </FormControl>
            </VStack>
            <VStack px = '10'>
                <Heading>
                    DNA Sequence
                </Heading>
                    <FormControl isRequired>
                        {/* <Input name='dnaSequence' placeholder='First name' value={formValues.dnaSequence} onChange = {handleChange}/> */}
                        <input type="file"
                        accept=".txt"
                        id="customFile"
                        onChange={handleUpload}
                        style={{ width:"100%", minWidth:"16vw", maxWidth:"16vw"}}
                        />
                        <p>{formErrors.sekuens}</p>
                    </FormControl>
            </VStack>
      </HStack>
      <Button colorScheme='blue' type= 'submit' onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
}

export default AddDiseasePage;