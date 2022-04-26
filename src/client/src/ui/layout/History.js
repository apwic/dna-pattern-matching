import { Box, Flex, Spacer, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";
import HistoryStack from '../../components/HistoryStack';
import Search from '../../components/Search';

function HistoryPage(){
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
      <HistoryStack/>
    </VStack>
  );
}

export default HistoryPage;