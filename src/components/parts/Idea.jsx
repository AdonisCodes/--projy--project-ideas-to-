import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import React, { useState } from "react";

const credentials = JSON.parse(localStorage.getItem('dbSecrets') || JSON.stringify({ url: null, key: null }))
const supabaseUrl = credentials.url;
const supabaseKey = credentials.key;


export default function Idea() {
  const [isLoading, setIsLoading] = useState(false);
  const [generation, setGeneration] = useState();

  async function generate() {
    setIsLoading(true);
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      // Handle the error if needed
      console.error("Error fetching project ideas:", error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    console.log(data);
    const randomIndex = Math.floor(Math.random() * data.length);
    setGeneration(data[randomIndex]);
  }

  let supabase = null;
  if (supabaseUrl !== null && supabaseKey !== null) {
    try{
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch {
      localStorage.clear()
      window.location.reload()
    }
  }

  async function deleteProject(id) {
    setIsLoading(true);
    await supabase.from('projects').delete().eq('id', id);
    setGeneration(null);
    setIsLoading(false);
  }

  return (
    <Flex direction="column">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={() => generate()} mb='12px' mr='auto'>Generate</Button>
          <Flex align='center' justifyItems='center' maxWidth='500px'>
            {generation ? (
              <Box p='12px' borderRadius='0.6rem' bg='gray.900'>
                <Heading>Title: {generation.name}</Heading>
                <Box mt='12px'><strong>Description:</strong> <br /> {generation.description}</Box>
                <Box mt='12px'>
                  {JSON.parse(generation.types).map((item, index) => (
                    <Flex key={index} bg='gray.600' p='3px' textAlign='center' borderRadius='0.4rem' mb='12px' align='center' justify='center'>{item}</Flex>
                  ))}
                </Box>
                <Button bg='tomato' onClick={() => {deleteProject(generation.id)}}>Delete</Button>
              </Box>
            ) : (
              <></>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}
