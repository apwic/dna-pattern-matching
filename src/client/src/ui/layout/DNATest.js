import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import React, {useState} from "react";
// import { Input } from "semantic-ui-react";
import './DNATest.css'
import DNAForm from "./DNAForm";
import Information from "../../components/Information";
import Result from "../../components/Result";
// import { Button, ButtonToolBar} from "react-bootstrap"
import dnatest from '../../assets/dnatest.png'

function DNATestPage(){
  const [setData] = useState(null)

  function getData(val){
    setData(val.target.value)
    console.warn(val.target.value);
  }  

  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }
  
  return (
        <div className='dnatest'>
            <Flex align="center" justify="center" style={{height : "20vh", width : "93.3vw", marginLeft : "5vw", backgroundColor : "#E1E5F1"}}>
                <Box>
                  <Image boxSize='100%' src={dnatest} alt="logo"/>
                </Box>
            </Flex>

            <Box marginTop={"5vh"} align = "Center" marginLeft={"7vw"} width={"91.3vw"}>
              <DNAForm/>
            </Box>

            <Box backgroundColor={"#C0DBF8"} borderRadius="15pt" marginTop={"5vh"} marginBottom={"5vh"} marginLeft={"12vw"} width={"77vw"}>
              <Result/>
            </Box>
        </div>
      );
}

export default DNATestPage;