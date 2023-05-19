import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Button,
    Stack,
    Box
} from '@chakra-ui/react'
import { useState } from "react"
import { registerUser } from '@/modules/fetch/users'
import { useRouter } from 'next/router';

function Register() {
    const router = useRouter();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {

        const response = await registerUser({ name, email, password })
        router.push('/login');
    }

    return (
        <>
            <Container>
                <Box p={4}
                    borderRadius="md"
                    boxShadow="dark-lg"
                    flexDirection="column"
                    bg="white"
                    display='flex'
                    alignItems='baseline'
                    my="20">
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Stack direction='row' mt="2"spacing={4} align='center'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Stack>

                </Box>
            </Container>
        </>
    )
}

export default Register;