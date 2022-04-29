import React from 'react'
import {HStack, Box, Image, Container, Heading, Button} from '@chakra-ui/react'
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
                                    Selamat Datang !
                                </Box>
                            </Heading>
                            <Box mt="6" fontWeight="medium">
                                Sekali lagi maafkanlah
                                Karena aku cinta kau dan dia
                                Maafkanlah ku tak bisa
                                Tinggalkan dirinya
                                Simpan sisa sisa cerita cinta berdua (hu)
                                Walau tak tercipta cerita cinta berdua (hu)
                                Still I have in my eyes
                                Still I have forever
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