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
    {
      id: 4,
      nama: 'epi',
      penyakit: "bucin kronis",
      persentase: '100%',
      status: 'positive'
  },
  {
      id: 5,
      nama: 'anca',
      penyakit: 'kurang afeksi',
      persentase: '80%',
      status: 'positive'
  },
  {
      id: 6,
      nama: 'budi',
      penyakit: 'kasep maksimal',
      persentase: '1000%',
      status: 'positive'
  },
  {
    id: 7,
    nama: 'epi',
    penyakit: "bucin kronis",
    persentase: '100%',
    status: 'positive'
  },
  {
      id: 8,
      nama: 'anca',
      penyakit: 'kurang afeksi',
      persentase: '80%',
      status: 'positive'
  },
  {
      id: 9,
      nama: 'budi',
      penyakit: 'kasep maksimal',
      persentase: '1000%',
      status: 'positive'
  },
  {
    id: 10,
    nama: 'epi',
    penyakit: "bucin kronis",
    persentase: '100%',
    status: 'positive'
  },
  {
    id: 11,
    nama: 'anca',
    penyakit: 'kurang afeksi',
    persentase: '80%',
    status: 'positive'
  },
  {
    id: 12,
    nama: 'budi',
    penyakit: 'kasep maksimal',
    persentase: '1000%',
    status: 'positive'
  },
];
  return (

    <VStack p={4}>
      <Heading
      mb='2'
      fontWeight='extrabold'
      size='2xl'
      p = '19'
      >
        HISTORY
      </Heading >

      <Search/>
      
      <Box marginLeft={"10vw"} width="100%" minWidth={"70vw"} maxWidth={"70vw"}>
        <HistoryStack history={history}/>
      </Box>
    </VStack>
  );
}

export default HistoryPage;