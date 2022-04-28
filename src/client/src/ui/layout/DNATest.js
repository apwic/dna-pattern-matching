import { Box, Flex, Heading, Image, Button, FormControl, VStack, Select, Input, Stack, RadioGroup, Radio} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import './DNATest.css'
import DNAForm from "./DNAForm";
import Information from "../../components/Information";
import Result from "../../components/Result";
import dnatest from '../../assets/dnatest.png';
// import NyobaInput from './NyobaInput.js';
import apiClient from "../../http-common.js";

function DNATestPage(){
  let status = false;
  const initiateData = {IdPengguna:"", NamaPengguna: "", Penyakit: "", Kemiripan: "", Status:"", Sekuens: "", Tanggal: ""};
  const [data, setData] = useState(initiateData);
  const initialValue = {namapengguna : "", penyakit : "", technique: "", sekuens: "", tanggal:" "};
  const initialDisease = {id: "", penyakit: ""}
  const [formValues, setFormValues] = useState(initialValue);
  const [diseaseList, setDiseaseList] = useState([initialDisease]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState(Information);

  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
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
      createDNAtest(e).then(res => {getDNATest(e)});
  };

  function formatedTimestamp() {
    const d = new Date()
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }

  async function createDNAtest(e) {
    // const {technique, name, disease, fileContent} = e.target.values;
    // console.log(technique, name, disease, fileContent);
    try{
        let response;
        if (formValues.technique === "KMP") {
          response = await apiClient.post('dnatest/create-tes-dna-kmp', {
            namapengguna: formValues.namapengguna,
            penyakit: formValues.penyakit,
            sekuens: formValues.sekuens,
            tanggal: formatedTimestamp(),
          });
        } else {
          response = await apiClient.post('dnatest/create-tes-dna-bm', {
            namapengguna: formValues.namapengguna,
            penyakit: formValues.penyakit,
            sekuens: formValues.sekuens,
            tanggal: formatedTimestamp(),
          });
        }
        const result = {
          status: response.status + "-" + response.statusText,
          headers: response.headers,
          data: response.data
        };
        if (response.status === 200){
          alert("Success");
        }
        console.log(result);
      } catch (err) {
        console.log(err.response?.data || err);
      }
  }


  async function updateDiseaseList(e) {
    try{
      const response = await apiClient.get('penyakit/get-penyakit');
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };

      const data = result.data;
      console.log(data);
      setDiseaseList(data);
      // for(let i=0; i<data.length; i++){
      // }
      // setGetResult(formatResponse(result));
    } catch (err) {
      // setGetResult(formatResponse(err.response?.data || err));
      console.log(err.response?.data || err);
    }
  }

  async function getDNATest(e) {
    try{
      const response = await apiClient.get('dnatest/get-latest');
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };
      const data = result.data;
      console.log(data[0]);
      setData(data[0]);
      setResult(Result(data[0]));
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

  return (
        <div className='dnatest'>
            <Flex align="center" justify="center" style={{height : "20vh", width : "93.3vw", marginLeft : "5vw", backgroundColor : "#E1E5F1"}}>
                <Box>
                  <Image boxSize='100%' src={dnatest} alt="logo"/>
                </Box>
            </Flex>

            <Box marginTop={"5vh"} align = "Center" marginLeft={"7vw"} width={"91.3vw"}>
            <VStack>
              <VStack p = '50'>
                  <VStack px = '10'>
                      <Heading>
                          namapengguna
                      </Heading>
                          <FormControl isRequired>
                              <Input name='namapengguna'  placeholder='Input your namapengguna here' value={formValues.namapengguna}
                              onChange = {handleChange}
                              />
                              <p>{formErrors.namapengguna}</p>
                          </FormControl>
                  </VStack>
                  <VStack px = '10'>
                      <Heading>
                          penyakit
                      </Heading>
                      <Select name='penyakit' placeholder='Select country' onClick={e=>updateDiseaseList(e)} onChange = {e=>setFormValues({...formValues, penyakit: e.target.value}) } value={formValues.penyakit}>
                          {diseaseList.map(disease => (
                          <option>{disease.NamaPenyakit}</option>
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
              <RadioGroup name='technique'>
                  <Stack direction='col'>
                      <Radio name = 'technique' value='KMP' onChange = {handleChange }>KMP</Radio>
                      <Radio name = 'technique' value='bayerMoore' onChange = {handleChange} >Bayer-Moore</Radio>
                  </Stack>
              </RadioGroup>
              <p>{formErrors.technique}</p>
              
              <Button colorScheme='blue' type= 'submit' onClick={handleSubmit}>Button</Button>
            </VStack>
            </Box>
            <Box backgroundColor={"#C0DBF8"} borderRadius="15pt" marginTop={"5vh"} marginBottom={"5vh"} marginLeft={"12vw"} width={"77vw"}>
              {result}
              {/* <{result} props={data}/> */}
            </Box>
        </div>
      );

}

export default DNATestPage;