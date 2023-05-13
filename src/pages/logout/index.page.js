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
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();

    const handleSubmit = async () => {
        localStorage.removeItem('token');
        router.push('/login');
}
    return <>
                <Stack direction='row' spacing={4} align='center'>
                <Button onClick={handleSubmit}>Logout</Button>
                </Stack>
        
            </>;
}

export default Logout;