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
        maxW={{base: '90vww', sm: '80vw', md: '50vw', lg: '40vw'}}
        alignItems='stretch'
        backgroundColor='#91ACCA'
        >
            {history.map(item => (
            <AccordionItem key={item.id} 
            borderWidth='1px'
            borderRadius='lg'
            p = '2px'
            my= '10px'
            backgroundColor='white'
            >
                <h2>
                    <AccordionButton _expanded={{ bg: '#012B39', color: 'white' }} borderRadius='lg'>
                        <Box flex='1' textAlign='left'>
                            <Heading size= 'md'>
                                {item.nama}
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <VStack>
                        <Heading size= 'base'>
                            {item.penyakit}
                        </Heading>
                        <Heading size= 'base'>
                            {item.persentase}
                        </Heading>
                        <Heading size= 'base'>
                            {item.status}
                        </Heading>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
            ))}
        </Accordion>
    )
}


export default HistoryStack