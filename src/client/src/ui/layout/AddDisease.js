import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import React, {useState} from "react";
// import { Input } from "semantic-ui-react";
import './DNATest.css'
import DiseaseForm from "./DiseaseForm";
// import { Button, ButtonToolBar} from "react-bootstrap"
// import {addDiseaseModal} from "../../components/addDiseaseModal";
import disease from '../../assets/disease.png'

function AddDiseasePage(){
  const [data, setData] = useState(null)
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
              {/* <Box>
                <Image boxSize='70%' src={disease} alt="logo"/>
              </Box> */}
              <Heading>Add Disease</Heading>
            </Flex>

            <Box marginTop={"5vh"} align = "Center" marginLeft={"7vw"} width={"91.3vw"}>
              <DiseaseForm/>
            </Box>
        </div>
      );
}

export default AddDiseasePage;