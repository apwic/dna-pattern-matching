import { Button, FormControl,Input, Box, Flex, Spacer, Heading, Image, position, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import './DNATest.css'
import DiseaseForm from "./DiseaseForm";
import disease from '../../assets/disease.png'

function AddDiseasePage(){
  const initialValue = {disease : "", fileContent: ""};
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  }
  const handleUpload = event => {
    const fileUploaded = event.target.files[0];
    setFormValues({...formValues, filename: fileUploaded.name})
    // const filename = fileUploaded.name;
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('file', fileUploaded);

    reader.readAsText(fileUploaded);
    reader.onload = () => {
      setFormValues({...formValues, fileContent: reader.result})
      console.log(reader.result);
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
};

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    if (!values.disease) {
        errors.name = "Disease name is required";
    }
    if (!values.fileContent) {
        errors.fileContent = "file is required";
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
                        <Input name='disease'  placeholder='Input disease name here' value={formValues.disease}
                        onChange = {handleChange}
                        />
                        <p>{formErrors.disease}</p>
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
                        <p>{formErrors.fileContent}</p>
                    </FormControl>
            </VStack>
      </HStack>
      <Button colorScheme='blue' type= 'submit' onClick={handleSubmit}>Button</Button>
    </VStack>
  );
}

export default AddDiseasePage;