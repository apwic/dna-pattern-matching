import React from 'react'
import {HStack, IconButton, VStack, Text, StackDivider, Spacer} from '@chakra-ui/react'
import {MdExpandMore} from 'react-icons/md'

function HistoryStack() {
    const history = [
        {
            id: 1,
            body: 'epi'
        },
        {
            id: 2,
            body: 'anca'
        },
        {
            id: 3,
            body: 'budi'
        },
    ]
    return(
        <VStack
            divider={<StackDivider />}
            borderColor='gray.200'
            borderWidth='2px'
            p = '4'
            borderRadius='lg'
            w='100%'
            maxW={{base: '90vww', sm: '80vw', md: '50vw', lg: '40vw'}}
            alignItems='stretch'
        >
            {history.map(item => (
                <HStack key={item.id}>
                    <Text>{item.body}</Text>
                    <Spacer/>
                    <IconButton icon={<MdExpandMore/>}/>
                </HStack>

            ))}
        </VStack>
    )
}


export default HistoryStack