import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Button,
    Stack,
    Alert
} from '@chakra-ui/react'
import { useState } from "react"
import { loginUser } from "../../modules/fetch/users"
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from "@/modules/authStore";


function Login() {
    const [showAlert, setShowAlert] = useState(false); // Define the showAlert state variable
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useAuthStore((state) => state.setUser); // update the user state managed by the useAuthStore yang telah kita buat.

    const handleSubmit = async () => {
        try {
          const response = await loginUser({ email, password });
          console.log(
            "handle response",
            response
          );
    
          // Update data user in the Zustand store (atau setting data user ke zustand agar disimpan)
          setUser(response);
    
          router.push("/");
        } catch (error) {
          console.error(error);
          setShowAlert(true);
        }
      };

    return (
        <div>{
            <Container>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Stack direction='row' spacing={4} align='center'>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleSubmit}
                        direction='row' spacing={4} align='center'>
                        Next
                    </Button>
                    <Link href="/register" className="btn btn-link">Register</Link>
                </Stack>
            </Container>}
            {showAlert && (
                <Alert status='error'>
                    Wrong Password Or Email
                    <button onClick={() => setShowAlert(false)}>Close</button>
                </Alert>
            )}
        </div>
    )
}

export default Login;