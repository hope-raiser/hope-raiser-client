import { createNewDonation } from "@/modules/fetch/donations";
import { 
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    Text, 
    VStack 
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function DonationCard({id}) {
    const [amount, setAmount] = useState("")
    // function Submit Donation
    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        const data = await createNewDonation(amount, id);
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