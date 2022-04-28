import React, {useState} from "react";
import { Box, Text } from "@chakra-ui/react";
import "./Information.css"

function Information(){
    return(
        <div>
            <div>
                <Box align="center" fontWeight="extrabold" padding={"5"} fontSize="20pt" textDecorationLine={"underline"} fontStyle={"italic"} >
                    Information
                </Box>           
            </div>

            <div>
                <Box fontSize={"13pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"13vw"} maxWidth={"13vw"} mt="5" fontWeight="bold" marginLeft={"0"} backgroundColor="#C4C4C4" >
                    DNA Sequence Input
                </Box>

                <Box mt="5" marginLeft={"5vw"} marginRight={"5vw"}>
                    <Text className={"font-link"} fontWeight="bold">
                    Consists of only ACGT Characters (all uppercase), with no whitespaces and length of sequence is less than length of disease sequence
                    </Text>
                    <Text textColor={"green.500"} fontWeight="bold">
                    ACGTACGT
                    </Text>
                    <Text textColor={"red.500"} fontWeight="bold">
                    ACGT ACGT
                    </Text>
                    <Text textColor={"red.500"} fontWeight="bold">
                    acgtACgt
                    </Text>
                    <Text textColor={"red.500"} fontWeight="bold">
                    AUGTACGT
                    </Text>

                    <div height="100%" style={{minHeight:"5vh"}}/>
                </Box>
            </div>
            
        </div>
    );
}

export default Information;