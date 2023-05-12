import { 
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    useToast,
 } from "@chakra-ui/react";
 import Layout from "@/components/Layout";
 import { createNewCampaign } from "@/modules/fetch/campaigns";
 import { SingleDatepicker } from "chakra-dayzed-datepicker";
 import React, { useState } from "react";

 function NewCampaign(){
    // using toast from chakra
    const toast = useToast();
    const [date, setDate] = useState(new Date());
    // submit function when user click the button
    async function handleSubmit(event){
        event.preventDefault();
        // get new form data
        const formData = new FormData(event.target);
        await createNewCampaign(formData);
        toast({
            title: "Campaign created",
            description: "Campaign Successfull created",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }
    return(
        <Layout>
            <form onSubmit={handleSubmit}>
                <VStack spacing="4">
                    <FormControl>
                        <FormLabel>Campaign Name</FormLabel>
                        <Input name="title" required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Campaign Description</FormLabel>
                        <Input name="description" required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Target Donation</FormLabel>
                        <Input name="goal" required/>
                    </FormControl>
                    <FormControl>
                        <Input 
                            type="hidden" 
                            name="currentDonation" 
                            defaultValue={0} 
                            required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Campaign End Date</FormLabel>
                        <SingleDatepicker 
                            name="endDate"
                            date={date}
                            onDateChange={setDate}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Image</FormLabel>
                        <Input 
                            name="banner" 
                            type="file"
                            accept="/image/*" required/>
                    </FormControl>
                    <Button type="submit">Create Campaign</Button>
                </VStack>
            </form>
        </Layout>
    )
 }

 export default NewCampaign;


