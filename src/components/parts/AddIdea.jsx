import { Box, Checkbox, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Textarea, Heading, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import React from 'react';
import { createClient } from '@supabase/supabase-js';

const credentials = JSON.parse(localStorage.getItem('dbSecrets') || JSON.stringify({ url: null, key: null }))
const supabaseUrl = credentials.url;
const supabaseKey = credentials.key;

export default function AddIdea() {
  const [projectName, setProjectName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [projectTypes, setProjectTypes] = React.useState([]); // Updated the initial state
  const [isLoading, setIsLoading] = React.useState(false);

  let supabase = null;
  if (supabaseUrl !== null && supabaseKey !== null) {
    try{
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch {
      localStorage.clear()
      window.location.reload()
    }
  }

  if (supabaseUrl === null && supabaseKey === null) {
  }
  const handleProjectTypes = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setProjectTypes((prevTypes) => [...prevTypes, value]);
    } else {
      setProjectTypes((prevTypes) => prevTypes.filter((type) => type !== value));
    }
    console.log(projectTypes)
  };

  const addIdea = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name: projectName,
          description: projectDescription,
          types: JSON.stringify(projectTypes),
        },
      ]);
    setProjectName('');
    setProjectDescription('');
    setProjectTypes([]);
    setIsLoading(false);

    if (error) {
      console.error("Error adding idea to the projects table:", error);
    } else {
      console.log("Idea added successfully:", data);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex p='12px' direction='column' justify='center' align='center'>
          <Input placeholder='Project Name' mb='10px' onChange={e => setProjectName(e.target.value)} value={projectName} />
          <Textarea placeholder='Project Description' onChange={e => setProjectDescription(e.target.value)} value={projectDescription} />
          <Flex p='10px' gap='1rem' wrap='wrap'>
            <Checkbox onChange={handleProjectTypes} value='web app'>Web App</Checkbox>
            <Checkbox onChange={handleProjectTypes} value='desktop app'>Desktop App</Checkbox>
            <Checkbox onChange={handleProjectTypes} value='mobile app'>Mobile App</Checkbox>
            <Checkbox onChange={handleProjectTypes} value='landing page'>Landing Page</Checkbox>
            <Checkbox onChange={handleProjectTypes} value='bot'>Bot</Checkbox>
            <Checkbox onChange={handleProjectTypes} value='automation'>Automation</Checkbox>
          </Flex>
          <Button onClick={() => addIdea()} mr='auto'>Add Idea</Button>
        </Flex>
      )}
    </Box>
  )
}
