import React from 'react'
import { Box, Image, Container, Heading, Button} from '@chakra-ui/react'
import home from '../assets/homephoto.png'
import {Link } from "react-router-dom";

function Tryit() {
        return (
            <Box bg='whiteA' w='100%' color='moon'>
                <Container maxW="container.xl">
                    <Box d="flex" alignItems="center" p="10">
                        <Box w="100%">
                            <Image boxSize='70%' src={home} alt="logo"/>
                        </Box>
                        <Box mr="0" >
                            <Heading as="h1" size="4xl">
                                <Box fontWeight="black">
                                    Welcome !
                                </Box>
                            </Heading>
                            <Box mt="6" fontWeight="medium">
                                DNA Test is a web application that provides a platform for users to analyze the presence of a disease based on DNA Sequences. Methodology used by this DNA Test Web implements Knuth-Morris-Pratt algorithm, Bayer-Moore algorithm, Levenshtein algorithm, brute force algorithm, and regular expression algorithm. 
                            </Box>
                            <Link to="/DNAtest">
                            <Button mt = "5" color="moon" ml = '45%'>
                                Try It!
                            </Button>
                            </Link>
                            
                        </Box>
                    </Box>
                </Container>
        </Box>
        )
}

export default Tryit