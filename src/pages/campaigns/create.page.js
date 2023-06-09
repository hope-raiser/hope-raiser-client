import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  useToast,
  Stack,
  Checkbox,
  CircularProgress
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { createNewCampaign } from "@/modules/fetch/campaigns";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import React, { useState, useEffect } from "react";
import { getAllCategory } from "@/modules/fetch/categories";
import { useRouter } from "next/router";
import useAuthStore from "@/modules/authStore";
import { getLoginUser } from "@/modules/fetch/users";

function NewCampaign() {
  // using toast from chakra
  const toast = useToast();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [categoryIds, setCategoryIds] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  let userData = useAuthStore((state) => state.user);

  const fetchUser = async () => {
    if (window.localStorage.getItem("token")) {
      const data = await getLoginUser();
      setCurrentUser(data);
    }
  };

  useEffect(() => {
    Promise.all([getAllCategory()]).then((values) => {
      setCategories(...values);
      setLoading(false);
    });
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // parsing agar keterima sebagai local storage
      useAuthStore.setState({ user: parsedUser }); // setting user data ke local storage
    }
    fetchUser();
  }, []);
  console.log(categories);


  // loading page
  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }
  // submit function when user click the button
  async function handleSubmit(event) {
    event.preventDefault();
    // get new form data
    let formData = new FormData(event.target);
    formData.append("category_ids", categoryIds);
    const res = await createNewCampaign(formData);

    toast({
      title: "Campaign created",
      description: "Campaign Successfull created",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    router.push("/");
  }
  const handleCategoryChange = (event) => {
    if (event.target.checked == true) {
      setCategoryIds([...categoryIds, +event.target.value]);
    } else {
      const selectIds = categoryIds.filter((a) => {
        if (a === +event.target.value) return false;
        return true;
      });
      setCategoryIds([...selectIds]);
    }
  };
  return (
    <Layout userMe={currentUser}>
      <form onSubmit={handleSubmit}>
        <VStack m="5" spacing="4">
          <FormControl>
            <FormLabel>Campaign Name</FormLabel>
            <Input name="title" required />
          </FormControl>
          <FormControl>
            <FormLabel>Campaign Description</FormLabel>
            <Input name="description" required />
          </FormControl>
          <FormControl>
            <FormLabel>Target Donation</FormLabel>
            <Input name="goal" required />
          </FormControl>
          <FormControl>
            <Input type="hidden" name="currentDonation" defaultValue={0} required />
          </FormControl>
          <FormControl>
            <FormLabel>Campaign End Date</FormLabel>
            <SingleDatepicker name="endDate" date={date} onDateChange={setDate} />
          </FormControl>
          <FormControl>
            <FormLabel>Campaign Category</FormLabel>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {categories.map((category, idx) => {
                return (
                  <div key={idx}>
                    <Checkbox
                      onChange={handleCategoryChange}
                      value={category.id}
                      isChecked={categoryIds.lastIndexOf(category.id) >= 0 ? true : false}
                    />
                    <FormLabel>{category.name}</FormLabel>
                  </div>
                );
              })}
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input name="image" type="file" accept="/image/*" required />
          </FormControl>
          <Button type="submit">Create Campaign</Button>
        </VStack>
      </form>
    </Layout>
  );
}

export default NewCampaign;
