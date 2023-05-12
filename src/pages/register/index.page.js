import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Button,
    Stack
  } from '@chakra-ui/react'
  import {useState} from "react"
  import { registerUser } from '@/modules/fetch/users'
  import { useRouter } from 'next/router';

function Register() {
    const router = useRouter();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {
        
        const response = await registerUser({name, email, password})
        router.push('/login');
    }

    return (
    <>
        <Container>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' onChange={(e) => setName(e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Stack direction='row' spacing={4} align='center'>
                <Button onClick={handleSubmit}>Submit</Button>
                </Stack>
        </Container>
    </>
    )
}

export default Register;