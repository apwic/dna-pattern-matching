import React, {useState} from "react";
import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
import "../ui/layout/DNATest.css"

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Result = (data) => {
  console.log(data);
    return(
        <div>
            <div>
                <Box align="center" fontWeight="bold" padding={"5"} fontSize="20pt" textDecorationLine={"underline"} fontStyle={"italic"} >
                    Analysis Result
                </Box>           
            </div>

            <div>
                <Flex justifyContent={"space-around"} flexDirection={"row"}>

                    <Flex justifyContent={"center"} alignItems="flex-start" flexDirection={"column"} marginRight="5vw">

                        <Flex alignItems={"center"} justifyContent={"flex-start"} flexDirection="row">
                            <Box justifyContent="flex-start" fontSize={"8pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"5vw"} maxWidth={"5vw"} mt="5" fontWeight="bold" marginLeft={"5vw"} backgroundColor="#C4C4C4" >
                                NAME
                            </Box>

                            <Box padding={"2"} fontSize={"17pt"} marginTop={"1vw"}>
                                {data.NamaPengguna}
                            </Box>
                        </Flex>

                        <Flex alignItems={"flex-start"} justifyContent={"flex-start"} flexDirection="row">
                            <Box justifyContent="flex-start" fontSize={"8pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"5vw"} maxWidth={"5vw"} mt="5" fontWeight="bold" marginLeft={"5vw"} backgroundColor="#C4C4C4" >
                                DATE
                            </Box>

                            <Box padding={"2"} fontSize={"17pt"} marginTop={"0.5vw"}>
                                {data.Tanggal}
                            </Box>
                        </Flex>

                        <Flex alignItems={"center"} justifyContent={"flex-start"} flexDirection="row">
                            <Box justifyContent="flex-start" fontSize={"8pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"5vw"} maxWidth={"5vw"} mt="5" fontWeight="bold" marginLeft={"5vw"} backgroundColor="#C4C4C4" >
                                DISEASE
                            </Box>

                            <Box padding={"2"} fontSize={"17pt"}  marginTop={"1vw"}>
                                {data.Penyakit}
                            </Box>
                        </Flex>

                    </Flex>

                    <Flex justifyContent={"center"} alignItems="flex-start" flexDirection={"column"} marginRight="5vw">

                        <Box textColor={"1F7A8C"} alignSelf="center" marginLeft={"3vw"} width="100%" fontWeight={"black"} padding={"2"} marginTop={"1vw"} marginRight="5vw" textAlign={"center"}>
                            DETECTION RESULT
                        </Box>

                        <Box marginTop={"5pt"} height={"100%"} minHeight="30vh" maxHeight={"30vh"} alignContent="center" alignItems={"center"} justifyContent="center">
                            <Box marginLeft={"1.8vw"} width={"100%"} minWidth={"14vw"} maxWidth="14vw" height={"100%"} minHeight={"14vw"} maxHeight={"14vw"}>
                                <CircularProgressbarWithChildren
                                    value={80}
                                    styles={buildStyles({
                                    pathColor: "#c64047",
                                    trailColor: "#eee",
                                    strokeLinecap: "butt"
                                    })}
                                >
                                    {/* Foreground path */}
                                    <CircularProgressbar
                                    value={data.Kemiripan}
                                    text={`${data.Kemiripan}%`}
                                    styles={buildStyles({
                                        textColor: "black",
                                        trailColor: "transparent",
                                        strokeLinecap: "butt"
                                    })}
                                    />
                                </CircularProgressbarWithChildren>
                            </Box>
                        </Box>

                        <Flex alignItems={"center"} justifyContent={"flex-start"} flexDirection="row">
                            <Box marginLeft={"1vw"} justifyContent="center" textAlign={"center"} fontSize={"8pt"} padding="2" borderRadius={"5pt"} width="100%" minWidth={"15vw"} maxWidth={"15vw"} mt="5" fontWeight="bold" backgroundColor="#FFFFFF" >
                                <Box textColor={"red"}>
                                    0 - 79 % : NOT DETECTED (FALSE)
                                </Box>
                                <Box>
                                    80 - 100 % : DETECTED (TRUE)
                                </Box>
                            </Box>
                        </Flex>
                        
                    </Flex>
                  
                </Flex>

                <div height="100%" style={{minHeight:"5vh"}}/>
            </div>
        </div>
    );
}

export default Result;