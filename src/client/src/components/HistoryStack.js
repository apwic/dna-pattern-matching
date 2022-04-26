import React from 'react'
import {Box, HStack, IconButton, VStack, Text, StackDivider, Spacer, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon} from '@chakra-ui/react'
import {MdExpandMore} from 'react-icons/md'

function HistoryStack() {
    const history = [
        {
            id: 1,
            body: 'epi',
            status: "bucin kronis"
        },
        {
            id: 2,
            body: 'anca',
            status: 'kurang afeksi'
        },
        {
            id: 3,
            body: 'budi',
            status: 'kasep maksimal'
        },
    ]
    return(
        // <VStack
        //     divider={<StackDivider />}
        //     borderColor='gray.200'
        //     borderWidth='2px'
        //     p = '4'
        //     borderRadius='lg'
        //     w='100%'
        //     maxW={{base: '90vww', sm: '80vw', md: '50vw', lg: '40vw'}}
        //     alignItems='stretch'
        // >
        //     {history.map(item => (
        //         <HStack key={item.id}>
        //             <Text>{item.body}</Text>
        //             <Spacer/>
        //             <IconButton icon={<MdExpandMore/>}/>
        //         </HStack>

        //     ))}
        // </VStack>
        <Accordion defaultIndex={[0]} allowMultiple>
            {history.map(item => (
            <AccordionItem key={item.id}>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {item.body}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {item.status}
                </AccordionPanel>
            </AccordionItem>
            ))}
        </Accordion>
    )
}


export default HistoryStack