import { useToast, Box, Flex, Heading, Image, Button, FormControl, VStack, Select, Input, Stack, RadioGroup, Radio, Badge} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import './DNATest.css'
import DNAForm from "./DNAForm";
import Information from "../../components/Information";
import Result from "../../components/Result";
import dnatest from '../../assets/dnatest.png';
// import NyobaInput from './NyobaInput.js';
import apiClient from "../../http-common.js";
import { useRef } from "react";
import * as FaIcons from 'react-icons/fa';

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
  const scrollToRef = useRef();
  const [filename, setFilename] = useState('Choose File');
  const hiddenFileInput = useRef(null);
  const toast = useToast()

  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
      console.log(formValues);
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };


  const handleUpload = event => {
      const pattern = /^[ACGT]+$/g;
      const fileUploaded = event.target.files[0];
      const filename = fileUploaded.name;
      setFormValues({...formValues, filenamapengguna: fileUploaded.name})
      setFilename(event.target.files[0].name);
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
          // alert("DNA sequence must be only A, C, G, T");
          toast({
            title: 'DNA sequence must be only A, C, G, T.',
            status: 'error',
            isClosable: true,
          })
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
      // createDNAtest(e).then(res => {getDNATest(e)});
      scrollToRef.current.scrollIntoView({behavior: "smooth"});
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
          status: response.status,
          headers: response.headers,
          data: response.data
        };
        console.log(result);
        if (response.status === 200){
          setFormValues(initialValue);
          // alert("Success");
          toast({
            title: 'Success! Your DNA test has been created.',
            status: 'success',
            isClosable: true,
          })
          getDNATest(e);
        }
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
    } catch (err) {
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
        errors.namapengguna = "Name is required";
    }
    if (!values.penyakit) {
        errors.penyakit = "Disease is required";
    }
    if (!values.technique) {
        errors.technique = "Technique is required";
    }
    if (!values.sekuens) {
        errors.sekuens = "File is required";
    }
    return errors;
  }

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scroll.scrollToBottom({ behavior: 'smooth', block: 'start' })
    }
  }  

  return (
        <div className='dnatest'>
            <Flex align="center" justify="center" style={{height : "20vh", width : "93.3vw", marginLeft : "5vw"}}>
                <Box>
                  <Image boxSize='100%' src={dnatest} alt="logo"/>
                </Box>
            </Flex>

            <Box align = "Center" marginTop={"3vh"} borderRadius={"20px"} marginLeft={"12vw"} marginRight={"7vw"} width={"80.3vw"} backgroundColor="#C0DBF8" padding={"1pt"}>
            <VStack>
              <VStack p = '5px'>
                  <VStack px = '10'>
                    <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} letterSpacing="0.5pt" marginTop={"4vh"}>
                      Name
                    </Box>
                          <FormControl isRequired>
                              <Input name='namapengguna'  placeholder='Write your name here!' value={formValues.namapengguna}
                              onChange = {handleChange}
                              backgroundColor="white"
                              border="2px solid #012B39"
                              width = "100%"
                              minWidth = "20vw"
                              maxWidth = "20vw"
                              />
                          </FormControl>
                          <Badge variant="solid" colorScheme='red'>{formErrors.namapengguna}</Badge>
                  </VStack>
                  <VStack px = '10'>
                    <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} letterSpacing="0.5pt">
                      Disease
                    </Box>
                      <Box borderRadius={"5pt"} backgroundColor={"white"} 
                      padding="0 0 0 10pt" 
                      width="100%" minWidth="20vw" maxWidth="20vw"
                      >
                      <Select name='penyakit' placeholder='Select a disease' onClick={e=>updateDiseaseList(e)} onChange = {e=>setFormValues({...formValues, penyakit: e.target.value}) } value={formValues.penyakit}
                        variant = "flushed"
                        bg = "white"
                        borderColor={"white"}
                        >
                          {diseaseList.map(disease => (
                          <option>{disease.NamaPenyakit}</option>
                          ))}
                      </Select>
                      </Box>
                      <Badge variant="solid" colorScheme='red'>{formErrors.penyakit}</Badge>
                  </VStack>
                  <VStack px = '10'>
                    <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} letterSpacing="0.5pt">
                      DNA Sequence
                    </Box>
                    <Flex>
                        <Box style={{padding:"4pt 0 0 0", marginLeft:"5vw", marginTop:"5pt", border: "1px", width:"100%", minWidth:"17vw", maxWidth:"17vw", height:"100%", minHeight:"6vh", maxHeight:"6vh", backgroundColor:"white", borderRadius:"5pt"}} className="file-label" htmlFor='customFile'>
                            {filename}
                          </Box>
                          <Button onClick={handleClick} marginTop="1vh" colorScheme="blue">
                            <FaIcons.FaUpload size={"200%"} />
                          </Button>
                          <FormControl isRequired>
                              {/* <Input namapengguna='dnaSequence' placeholder='First namapengguna' value={formValues.dnaSequence} onChange = {handleChange}/> */}
                              <input type="file"
                              accept=".txt"
                              id="customFile"
                              ref={hiddenFileInput}
                              onChange={handleUpload}
                              style={{ 
                                display: "none",
                              }}
                              />
            
                          </FormControl>
                    </Flex>
      
                          <Badge variant="solid" colorScheme='red'>{formErrors.sekuens}</Badge>
                  </VStack>
              <Box font="Poppins" fontWeight={"bold"} fontSize="20pt" marginBottom={"1vh"} letterSpacing="0.5pt">
                      Technique
                    </Box>
                <RadioGroup name='technique'>
                    {/* <Stack direction='col' backgroundColor={"white"} pr="5pt" borderRadius={"5pt"}> */}
                        <Box backgroundColor={"white"} padding="5px 10px 5px 0px" borderRadius="5px">
                          <Box>
                          <Radio name = 'technique' value='KMP' 
                        onChange = {handleChange }
                        colorScheme = "blue">
                          KMP
                          </Radio>
                          </Box>
                            <Box>
                            <Radio name = 'technique' value='bayerMoore' 
                        onChange = {handleChange}
                        colorScheme = "blue" >
                          Bayer-Moore
                          </Radio>
                            </Box>
                          </Box>
                    {/* </Stack> */}
                </RadioGroup>
                <Badge variant="solid" colorScheme='red'>{formErrors.technique}</Badge>
                <Button colorScheme='blue' marginTop={"15pt"} borderRadius={"15pt"} backgroundColor="#91ACCA" type= 'submit' onClick={handleSubmit}>Submit</Button>
              </VStack>
              
            </VStack>
              <Box ref={scrollToRef} backgroundColor={"#E1E5F1"} borderRadius="15pt" marginTop={"5vh"} marginBottom={"5vh"} width={"77vw"}>
                {result}
                {/* <{result} props={data}/> */}
              </Box>
            </Box>
        </div>
      );

}

export default DNATestPage;