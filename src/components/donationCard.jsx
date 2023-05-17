import { createNewDonation } from "@/modules/fetch/donations";
import { 
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    Text, 
    VStack,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

function DonationCard({id}) {
    const router = useRouter();
    const toast = useToast();
    const [amount, setAmount] = useState("")
    // function Submit Donation
    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        const data = await createNewDonation({amount, campaignId: id});
        toast({
            title: "Donation Success",
            description: "Thanks for your support",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        router.push(`/campaigns/${id}`)
    }
    return (
        <form onSubmit={handleDonationSubmit}>
            <VStack>
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input name="amount" type="number" onChange={(e) => setAmount(e.target.value)} />
                </FormControl>
                <Button type="submit">Donation</Button>
            </VStack>
        </form>    
    )
}



export default DonationCard; 