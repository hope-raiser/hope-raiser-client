import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function CampaignCard(props) {
  const { campaign } = props;
  const router = useRouter();

  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Link href={`/campaigns/${campaign.id}`}>
            {campaign.banner.map((bann, index) => {
              return <Image key={index} src={bann.image} />;
            })}
            <Stack mt="6" spacing="3">
              <Heading size="md">{campaign.title}</Heading>
              <Text>{campaign.description}</Text>
              <Text color="blue.600" fontSize="md">
                Current Donation {campaign.currentDonation}
              </Text>
            </Stack>
          </Link>
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
            <Button variant="solid" colorScheme="orange" onClick={() => router.push(`campaigns/${campaign.id}/edit`)}>
              Update
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export default CampaignCard;
