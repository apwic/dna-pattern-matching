import React from 'react'
import {Box, HStack, IconButton, VStack, Text, StackDivider, Spacer, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading} from '@chakra-ui/react'
import {MdExpandMore} from 'react-icons/md'

function HistoryStack() {
    const history = [
        {
            id: 1,
            nama: 'epi',
            penyakit: "bucin kronis",
            persentase: '100%',
            status: 'positive'
        },
        {
            id: 2,
            nama: 'anca',
            penyakit: 'kurang afeksi',
            persentase: '80%',
            status: 'positive'
        },
        {
            id: 3,
            nama: 'budi',
            penyakit: 'kasep maksimal',
            persentase: '1000%',
            status: 'positive'
        },
    ]
    return(
        <Accordion defaultIndex={[0]} allowMultiple 
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
            mb= '10px'
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