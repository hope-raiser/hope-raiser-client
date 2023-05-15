import { createNewDonation } from "@/modules/fetch/donations";
import { 
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    Text, 
    VStack 
} from "@chakra-ui/react";

function DonationCard() {
    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.donationAmount.value);
        const data = await createNewDonation(e.target);
    }
    return (
        <form onSubmit={handleDonationSubmit}>
            <VStack>
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input name="amount"/>
                </FormControl>
                <Button type="submit">Donation</Button>
            </VStack>
        </form>    
    )
}

export default DonationCard;