import { Button, FormControl, HStack, VStack, Select, Heading, Input, Stack, RadioGroup, Radio} from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'

function NyobaInput() {
    const initialValue = {name : "", prediction : "", method: "", fileContent: ""};
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
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.prediction) {
            errors.prediction = "Prediction is required";
        }
        if (!values.method) {
            errors.method = "Method is required";
        }
        if (!values.fileContent) {
            errors.fileContent = "file is required";
        }
        return errors;
    }

    const disease_list = [
        { id: "", name: "Select a disease" },
        { id: "HIV", name: "HIV" },
        { id: "Penyakit1", name: "Penyakit1" },
        { id: "Penyakit2", name: "Penyakit2" },
        { id: "Penyakit3", name: "Penyakit3" },
        { id: "Penyakit4", name: "Penyakit4" },
        { id: "Penyakit5", name: "Penyakit5" },
        { id: "Penyakit6", name: "Penyakit6" },
        { id: "Penyakit7", name: "Penyakit7" },
        { id: "Penyakit8", name: "Penyakit8" }
      ];
  return (
    <VStack>
        <VStack p = '50'>
            <VStack px = '10'>
                <Heading>
                    Name
                </Heading>
                    <FormControl isRequired>
                        <Input name='name'  placeholder='Input your name here' value={formValues.name}
                        onChange = {handleChange}
                        />
                        <p>{formErrors.name}</p>
                    </FormControl>
            </VStack>
            <VStack px = '10'>
                <Heading>
                    Prediction
                </Heading>
                <Select name='prediction' placeholder='Select country' onChange = {e=>setFormValues({...formValues, prediction: e.target.value}) } value={formValues.prediction}>
                    {disease_list.map(disease => (
                    <option>{disease.name}</option>
                    ))}
                </Select>
                <p>{formErrors.prediction}</p>
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
        </VStack>
        <Heading>
                Method
        </Heading>
        <RadioGroup name='method'>
            <Stack direction='col'>
                <Radio name = 'method' value='kmp' onChange = {handleChange }>KMP</Radio>
                <Radio name = 'method' value='bayerMoore' onChange = {handleChange} >Bayer-Moore</Radio>
            </Stack>
        </RadioGroup>
        <p>{formErrors.method}</p>
        
        <Button colorScheme='blue' type= 'submit' onClick={handleSubmit}>Button</Button>
    </VStack>
  )
}

export default NyobaInput