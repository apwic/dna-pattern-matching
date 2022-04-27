import React from 'react'
import {Box, HStack, IconButton, VStack, Text, StackDivider, Spacer, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading} from '@chakra-ui/react'
import {MdExpandMore} from 'react-icons/md'

function HistoryStack({history}) {
    return(
        <Accordion allowToggle 
        divider={<StackDivider />}
        borderColor='gray.200'
        borderWidth='1px'
        p = '2'
        borderRadius='lg'
        w='100%'
        maxW={{base: '90vw', sm: '80vw', md: '50vw', lg: '90vw'}}
        alignItems='stretch'
        backgroundColor='#91ACCA'
        >
            {history.map(item => (
            <AccordionItem key={item.IdPengguna} 
            borderWidth='1px'
            borderRadius='lg'
            p = '2px'
            my= '10px'
            backgroundColor='#E1E5F1'
            >
                <h2>
                    <AccordionButton _expanded={{ bg: '#012B39', color: 'white' }} borderRadius='lg'>
                        <Box flex='1' textAlign='left'>
                            <Heading size= 'md'>
                              {item.NamaPengguna}
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <VStack>
                        <Heading size= 'base'>
                            Penyakit: {item.Penyakit}
                        </Heading>
                        <Heading size= 'base'>
                            Kemiripan: {item.Kemiripan}
                        </Heading>
                        <Heading size= 'base'>
                            Status: {item.Status}
                        </Heading>
                        <Heading size= 'base'>
                            Tanggal: {item.Tanggal}
                        </Heading>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
            ))}
        </Accordion>
    )
}


export default HistoryStack