import { createNewDonation } from "@/modules/fetch/donations";
import { 
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    Text, 
    VStack 
} from "@chakra-ui/react";

function donationCard() {
    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.donationAmount.value);
        const data = await createNewDonation(e.target);
    }
    return (
        <form onSubmit={handleDonationSubmit}>
            <VStack>
                <Text>Add Donation to This</Text>
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input name="amount"/>
                </FormControl>
                <Button type="submit">Donation</Button>
            </VStack>
        </form>    
    )
}

export default donationCard;