import React, {useState} from "react";
import { Box, Text } from "@chakra-ui/react";
import "./Information.css"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function Information(){
    return(
        <div>
            <div>
                <Box align="center"  fontWeight="extrabold" padding={"5"} fontSize="20pt" textDecorationLine={"underline"} fontStyle={"italic"} >
                    Information
                </Box>           
            </div>

            <div>
                <Box fontSize={"13pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"13vw"} maxWidth={"13vw"} mt="5" fontWeight="bold" marginRight={"55vw"} backgroundColor="#C4C4C4" >
                    DNA Sequence Input
                </Box>

                <Box justifyContent={"flex-start"}  mt="5" marginLeft={"5vw"} marginRight={"5vw"}>
                    <Text align={"left"} className={"font-link"} fontWeight="bold" marginBottom={"0.5vw"}>
                    Consists of only ACGT Characters (all uppercase), with no whitespaces and length of sequence is less than length of disease sequence
                    </Text>
                    <Text align={"left"} textColor={"green.500"} fontWeight="bold">
                    <FaIcons.FaCheck/>
                    ACGTACGT
                    </Text>
                    <Text align={"left"} textColor={"red.500"} fontWeight="bold" marginTop={"0.5vw"}>
                    <AiIcons.AiOutlineClose />                   
                    ACGT ACGT
                    </Text>
                    <Text align={"left"} textColor={"red.500"} fontWeight="bold">
                    acgtACgt
                    </Text>
                    <Text align={"left"} textColor={"red.500"} fontWeight="bold">
                    AUGTACGT
                    </Text>

                    <div height="100%" style={{minHeight:"5vh"}}/>
                </Box>
            </div>
            
        </div>
    );
}

export default Information;