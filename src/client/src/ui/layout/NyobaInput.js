import { Button, FormControl, HStack, VStack, Select, Heading, Input, Stack, RadioGroup, Radio} from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'
import apiClient from "../../http-common.js";

function NyobaInput() {
    const initialValue = {namapengguna : "", penyakit : "", technique: "", sekuens: "", tanggal:" "};
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {namapengguna, value} = e.target;
        setFormValues({...formValues, [namapengguna]: value});
        console.log(formValues);
    }

    const handleUpload = event => {
        const pattern = /^[ACGT]+$/g;
        const fileUploaded = event.target.files[0];
        setFormValues({...formValues, filenamapengguna: fileUploaded.name})
        // const filenamapengguna = fileUploaded.namapengguna;
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
        createDNAtest(e);
    };

    function formatedTimestamp() {
        const d = new Date()
        const date = d.toISOString().split('T')[0];
        const time = d.toTimeString().split(' ')[0];
        return `${date} ${time}`
      }

    async function createDNAtest(e) {
        const {technique, name, disease,fileContent} = e.target;
        try{
            let response;
            if (technique === "KMP") {
              response = await apiClient.post('dnatest/create-tes-dna-kmp', {
                namapengguna: name,
                penyakit: disease,
                sekuens: fileContent,
                tanggal: formatedTimestamp(),
              });
            } else {
              response = await apiClient.post('dnatest/create-tes-dna-bm', {
                namapengguna: name,
                penyakit: disease,
                sekuens: fileContent,
                tanggal: formatedTimestamp(),
              });
            }
            const result = {
              status: response.status + "-" + response.statusText,
              headers: response.headers,
              data: response.data
            };
            console.log(result);
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
        if (!values.namapengguna) {
            errors.namapengguna = "namapengguna is required";
        }
        if (!values.penyakit) {
            errors.penyakit = "penyakit is required";
        }
        if (!values.technique) {
            errors.technique = "technique is required";
        }
        if (!values.sekuens) {
            errors.sekuens = "file is required";
        }
        return errors;
    }

    const disease_list = [
        { id: "", namapengguna: "Select a disease" },
        { id: "HIV", namapengguna: "HIV" },
        { id: "Penyakit1", namapengguna: "Penyakit1" },
        { id: "Penyakit2", namapengguna: "Penyakit2" },
        { id: "Penyakit3", namapengguna: "Penyakit3" },
        { id: "Penyakit4", namapengguna: "Penyakit4" },
        { id: "Penyakit5", namapengguna: "Penyakit5" },
        { id: "Penyakit6", namapengguna: "Penyakit6" },
        { id: "Penyakit7", namapengguna: "Penyakit7" },
        { id: "Penyakit8", namapengguna: "Penyakit8" }
      ];
  return (
    <VStack>
        <VStack p = '50'>
            <VStack px = '10'>
                <Heading>
                    namapengguna
                </Heading>
                    <FormControl isRequired>
                        <Input namapengguna='namapengguna'  placeholder='Input your namapengguna here' value={formValues.namapengguna}
                        onChange = {handleChange}
                        />
                        <p>{formErrors.namapengguna}</p>
                    </FormControl>
            </VStack>
            <VStack px = '10'>
                <Heading>
                    penyakit
                </Heading>
                <Select namapengguna='penyakit' placeholder='Select country' onChange = {e=>setFormValues({...formValues, penyakit: e.target.value}) } value={formValues.penyakit}>
                    {disease_list.map(disease => (
                    <option>{disease.namapengguna}</option>
                    ))}
                </Select>
                <p>{formErrors.penyakit}</p>
            </VStack>
            <VStack px = '10'>
                <Heading>
                    DNA Sequence
                </Heading>
                    <FormControl isRequired>
                        {/* <Input namapengguna='dnaSequence' placeholder='First namapengguna' value={formValues.dnaSequence} onChange = {handleChange}/> */}
                        <input type="file"
                        accept=".txt"
                        id="customFile"
                        onChange={handleUpload}
                        style={{ width:"100%", minWidth:"16vw", maxWidth:"16vw"}}
                        />
                        <p>{formErrors.sekuens}</p>
                    </FormControl>
            </VStack>
        </VStack>
        <Heading>
                technique
        </Heading>
        <RadioGroup namapengguna='technique'>
            <Stack direction='col'>
                <Radio namapengguna = 'technique' value='kmp' onChange = {handleChange }>KMP</Radio>
                <Radio namapengguna = 'technique' value='bayerMoore' onChange = {handleChange} >Bayer-Moore</Radio>
            </Stack>
        </RadioGroup>
        <p>{formErrors.technique}</p>
        
        <Button colorScheme='blue' type= 'submit' onClick={handleSubmit}>Button</Button>
    </VStack>
  )
}

export default NyobaInput