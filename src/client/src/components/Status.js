import React from 'react'
import {Badge} from '@chakra-ui/react'
function Status({status}) {

if (status === 1){
    return(<Badge colorScheme='red'>POSITIVE</Badge>)
    }
  return (
    <Badge colorScheme='green'>NEGATIVE</Badge>
  )
}

export default Status