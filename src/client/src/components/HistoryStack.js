import React from 'react'
import {Box, HStack, IconButton, VStack, Text, StackDivider, Spacer, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Badge} from '@chakra-ui/react'
import {MdExpandMore} from 'react-icons/md'
import Merah from './Merah'
import TanggalFormat from './TanggalFormat'
import Status from './Status'

function HistoryStack({history}) {
    if(history.length === 0){
        return(
          <Box backgroundColor='#91ACCA' borderRadius='lg' h= '100px'  alignItems='center'justifyItems='center'  display ='flex' justifyContent='center'>
                <Badge colorScheme='yellow' p='4' m='4' borderRadius='lg'>
                No History Found
                </Badge>
          </Box>
        );
      }

    if(history[0].NamaPengguna === ''){
        return(
            <Box backgroundColor='#91ACCA' borderRadius='lg' h= '100px'  alignItems='center'justifyItems='center'  display ='flex'justifyContent='center'>
                <Badge colorScheme='purple' p='4' m='4' borderRadius='lg'>
                Press Search Button To Show All History
                </Badge>
          </Box>
        );
      }

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
                        <Box flex='1' w= '100%'>
                            <VStack w='100%' alignItems = 'strech'>
                                <HStack>
                                    <Heading size= 'md'>
                                        {item.NamaPengguna}
                                    </Heading>
                                    <Spacer/>
                                        {/* <Heading size= 'md' color = '#C53030'>
                                            {item.Penyakit}
                                        </Heading> */}
                                        <Merah Penyakit= {item} />

                                </HStack>
                            </VStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <VStack>
                        <TanggalFormat tanggal= {item.Tanggal} />
                        <Heading size= 'base'>
                            Penyakit: {item.Penyakit}
                        </Heading>
                        <Heading size= 'base'>
                            Kemiripan: {item.Kemiripan}%
                        </Heading>
                        <Status status = {item.Status} />
                        {/* <Heading size= 'base'>
                            Status: {item.Status}
                        </Heading> */}
                        {/* <Heading size= 'base'>
                            Tanggal: {item.Tanggal}
                        </Heading> */}
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
            ))}
        </Accordion>
    )
}


export default HistoryStack