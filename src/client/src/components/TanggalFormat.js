import React from 'react'
import {Heading} from '@chakra-ui/react'

function TanggalFormat({tanggal}) {
 var str = tanggal.toString();
 var newstr = str.slice(0,10);
  return (
    <Heading size= 'base'>
    Tanggal: {newstr}
    </Heading>
  )
}

export default TanggalFormat