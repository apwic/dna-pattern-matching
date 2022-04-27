import { Box, Flex, Spacer, Heading, Image, VStack, Button, HStack, Input } from "@chakra-ui/react";
import React from "react";
import HistoryStack from '../../components/HistoryStack';
import Search from '../../components/Search';
import apiClient from "../../http-common.js"
import * as FaIcons from 'react-icons/fa';

function HistoryPage(){
  const initiateDNATest = {IdPengguna:"", NamaPengguna: "", Penyakit: "", Kemiripan: "", Status:"", Sekuens: "", Tanggal: ""};
  const initiateSearch = {Penyakit: "", Tanggal: ""};
  const [history, setHistory] = React.useState([initiateDNATest]);
  const [search, setSeatch] = React.useState(initiateSearch);

  async function getHistory(e) {
    try{
      const response = await apiClient.get('history/get-all-tes-dna');
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };
      console.log(result);
      setHistory(result.data);
    } catch(err){
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSeatch({...search, [name]: value});
    console.log(search);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getHistory(e);
  }
  
  return (
    <VStack p={4}>
      <Heading
      mb='2'
      fontWeight='extrabold'
      size='2xl'
      p = '19'
      >
        HISTORY
      </Heading >

      <form onChange={handleChange}>
            <HStack p = '10'>
                <Input variant='filled' placeholder='Ketik di sini' />
                <Button colorScheme='teal' variant='solid' onClick={handleSubmit}>
                    <FaIcons.FaSearch size={"80%"}/>
                </Button>
            </HStack>
      </form>
      
      <Box marginLeft={"10vw"} width="100%" minWidth={"70vw"} maxWidth={"70vw"}>
        <HistoryStack history={history}/>
      </Box>
    </VStack>
  );
}

export default HistoryPage;