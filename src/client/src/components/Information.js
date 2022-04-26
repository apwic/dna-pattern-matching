import React, {useState} from "react";
import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";

function Information(){
    return(
        <div>
            <div>
            <Box align="center" fontWeight="bold" padding={"5"} fontSize="20pt" textDecorationLine={"underline"} fontStyle={"italic"} >
                    Information
                </Box>           
            </div>
            <div>
                <Box justifyContent="flex-start" fontSize={"13pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"13vw"} maxWidth={"13vw"} mt="5" fontWeight="bold" marginLeft={"5vw"} backgroundColor="#C4C4C4" >
                    DNA Sequence Input
                </Box>
                <Box justifyContent="flex-start" mt="5" marginLeft={"5vw"} marginRight={"5vw"}>
                    <p>
                    Consists of only ACGT Characters (all uppercase), with no whitespaces and length of sequence is less than length of disease sequence
                    </p>
                    <p>
                    ACGTACGT
                    </p>
                    <p>
                    ACGT ACGT
                    </p>
                    <p>
                    acgtACgt
                    </p>
                    <p>
                    AUGTACGT
                    </p>
                    <div height="100%" style={{minHeight:"5vh"}}/>
                </Box>
            </div>
        </div>
    );
}

export default Information;