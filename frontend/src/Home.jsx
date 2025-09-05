import { Box, Button, Input, Text, VStack, Heading, Container, HStack, IconButton, useToast } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const toast = useToast();

  const [enteredUrl, changeUrl] = useState('');
  const [shortUrl, changeShortUrl] = useState('');

  const backendUrl = "http://localhost:5000";

  const generateUrl = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/shorten', { originalURL: enteredUrl });
      console.log("Url generated: ", data);
      changeUrl('');
      changeShortUrl(data.data.shortId);
      console.log(shortUrl);
      navigate('/');
    } catch (error) {
      console.error("Registration failed: ", error);

      toast({
        title: "Invalid URL",
        description: error.response?.data?.message || "Please enter a valid URL",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      changeUrl('');
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
    <Container maxW="lg" centerContent py={10}>
      <Box display="flex" alignItems="center" justifyContent="center"w="100%" shadow="xl" borderRadius="2xl" p={8} bg="white">
        <VStack spacing={6}>
          <Heading size="lg" textAlign="center" color="blue.600">
            URL Shortener
          </Heading>

          <Input
            value={enteredUrl}  
            onChange={(e) => changeUrl(e.target.value)}
            placeholder="Enter your URL"
            size="lg"
            focusBorderColor="blue.400"
          />

          <Button
            onClick={generateUrl}
            colorScheme="blue"
            w="100%"
            size="lg"
            borderRadius="xl"
          >
            Generate
          </Button>

          {shortUrl && (
            <Box
              p={4}
              w="100%"
              textAlign="center"
              bg="gray.50"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="md" color="gray.600" mb={2}>
                Your shortened link:
              </Text>

              <HStack justify="center" spacing={3}>
                <Text fontSize="lg" fontWeight="bold" color="blue.500">
                  {backendUrl + '/' + shortUrl}
                </Text>
                <IconButton
                  aria-label="Copy to clipboard"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(backendUrl + '/' + shortUrl)}
                />
              </HStack>
            </Box>
          )}
        </VStack>
      </Box>
    </Container>
    </Box>
  );
}

export default Home;
