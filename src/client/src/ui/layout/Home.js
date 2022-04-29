import { Box, VStack} from "@chakra-ui/react";
import React from "react";  
import Tryit from '../../components/Tryit';

function HomePage(){
  return (
    <VStack > 
      <Box bg='#91ACCA' w='100%' h='186'  color='moon' >
      </Box>
      <Tryit/>
      <Box bg='#E1E5F1' w='100%' h='186'  color='moon'>
        
      </Box>
    </VStack>
  );
}

export default HomePage;