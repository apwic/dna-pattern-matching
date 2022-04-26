import { Box, Flex, Spacer, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";
import HistoryStack from '../../components/HistoryStack';
import Search from '../../components/Search';

function HistoryPage(){
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
];
  return (
    <VStack p={4}>
      <Heading
      mb='8'
      fontWeight='extrabold'
      size='2xl'
      p = '19'
      >
        HISTORY
      </Heading >
      <Search/>
      <HistoryStack history = {history}/>
    </VStack>
  );
}

export default HistoryPage;