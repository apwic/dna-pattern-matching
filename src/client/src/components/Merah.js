import React from 'react'
import {Heading} from '@chakra-ui/react'

function Merah({Penyakit}) {
    console.log({Penyakit})
    if (Penyakit.Status === 1){
        return(
            <Heading size= 'md' color = '#E53E3E'>
                {Penyakit.Penyakit}
            </Heading>
        )
    }
    return (
    <Heading size= 'md' color = '#48BB78'>
        {Penyakit.Penyakit}
    </Heading>
  )
}

export default Merah