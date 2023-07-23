import { Box, Heading, Input, Button, Img, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import TableSetup from '../../assets/table_setup.png'

export default function Credentials() {
    const [supabaseUrl, setSupabaseUrl] = React.useState('');
    const [supabaseKey, setSupabaseKey] = React.useState('');
    const br = useBreakpointValue({ base: '95%', md: '500px' })
    const handleSubmit = () => {
        localStorage.setItem('dbSecrets', JSON.stringify({url: supabaseUrl, key: supabaseKey}))
        window.location.reload()
    }

  return (
    <Box p='12px' w={br} mr='auto' ml='auto'>
        <Heading mt='12px'>Credentials</Heading>
        <Input placeholder='Supabase URL' mt='12px' onChange={(e) => setSupabaseUrl(e.target.value)} value={supabaseUrl}/>
        <Input placeholder='Supabase Key' mt='12px' onChange={(e) => setSupabaseKey(e.target.value)} value={supabaseKey}/>
        <Heading>Do the following</Heading>
        <Text>1. Create a new table called 'projects' with the following columns:</Text>
        <Img src={TableSetup} mt='12px' h='250px' />
        <Text>2. Remove The RLS policy from the 'projects' table.</Text>
        <Button onClick={() => handleSubmit()} mt='12px'>3. Submit</Button>
    </Box>
  )
}