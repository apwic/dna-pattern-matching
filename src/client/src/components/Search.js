import React from 'react'
import {Button, HStack, Input} from '@chakra-ui/react'
import * as FaIcons from 'react-icons/fa';

function Search() {
    function handleSubmit(e){
      
    }
    return (
        <form onSubmit={handleSubmit}>
            <HStack p = '10'>
                <Input variant='filled' placeholder='Ketik di sini' />
                <Button colorScheme='teal' variant='solid'>
                    <FaIcons.FaSearch size={"80%"}/>
                </Button>
            </HStack>
        </form>
    )
    }

export default Search;