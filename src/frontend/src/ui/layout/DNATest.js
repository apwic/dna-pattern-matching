import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, {useState} from "react";
import { Input } from "semantic-ui-react";
import './DNATest.css'

function DNATestPage(){
  const [data, setData] = useState(null)
  const [radio, setRadio] = useState("KMP")
  const option = [{key : 'HIV', text : 'HIV', value : 'HIV'}, {key : 'Penyakit1', text : 'Penyakit1', value : 'Penyakit1'}]
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
            <Flex align="center" flexDirection={"row-reverse"} justify="center" style={{height : "20vh", width : "94vw", marginLeft : "6vw", backgroundColor : "#E1E5F1"}}>
              <Heading>DNA Test</Heading>
            </Flex>

            <Spacer size="lg" />
            <Spacer size="lg" />

            <form onSubmit={handleSubmit}>
              <Flex
                alignItems={"center"}
                flexDirection={"row"}
                marginX={"10%"}
              >
                <Box>
                  <h3>Name</h3>
                  <Input type="text" placeholder="Name" onChange={getData}/>
                </Box>
                <Spacer size="lg" />
                <Box>
                  <h3 position = "fixed">Prediction</h3>
                  <Dropdown 
                  placeholder="Select an option" 
                  fluid 
                  search 
                  selection 
                  options={option}
                  style = {{width : "50%", position : "fixed"}}
                  />
                </Box>
                <Spacer size="lg" />
                <Box>
                  <h3>DNA Sequence</h3>
                  <Input type="text" placeholder="DNA Sequence" onChange={getData}/>
                </Box>
              </Flex>

              <Box marginTop= {"5vh"} align = "Center">
                <h3>Technique</h3>
                <input type="radio" checked={radio === "KMP"} value="KMP" onChange={(e)=>setRadio(e.target.value)}/>
                <label>KMP</label>
                <br/>
                <input type="radio" checked={radio === "Bayer-Moore"} value="Bayer-Moore" onChange={(e)=>setRadio(e.target.value)}/>
                <label>Bayer-Moore</label>
              </Box>
              <Box marginTop={"5vh"} align = "Center">
                <button type="submit" color="#91ACCA">Submit</button>
              </Box>

            </form>
        </div>
      );
}

export default DNATestPage;