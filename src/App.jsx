import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'
import AddIdea from './components/parts/AddIdea'
import Idea from './components/parts/Idea';
import Credentials from './components/parts/Credentials';

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const database = JSON.parse(localStorage.getItem('dbSecrets') || JSON.stringify({ url: null, key: null }))
  localStorage.setItem('chakra-ui-color-mode', 'dark')
  return (
    <ChakraProvider>
      {!database.key && !database.url ? <Credentials /> :
        <Flex w='100vw' h='100vh' display='flex' align='center' justify='center'>
          <Tabs>
            <TabList>
              <Tab>Generate</Tab>
              <Tab>Add</Tab>
            </TabList>

            <TabPanels >
              <TabPanel h='500px' maxWidth='600px'>
                <Idea />
              </TabPanel>
              <TabPanel h='500px' maxWidth='600px'>
                <AddIdea />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      }
    </ChakraProvider>
  )
}