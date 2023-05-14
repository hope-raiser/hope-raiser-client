import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function CampaignCard(props) {
  const { id, title, description, goal, currentDonation, endDate, banner } = props;
  const router = useRouter();

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={banner.length == 0 ? "[]" : banner[0].image} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="md">
            Current Donation {currentDonation}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
          <Button variant="solid" colorScheme="orange" onClick={() => router.push(`campaigns/${id}/edit`)}>
            Update
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default CampaignCard;
