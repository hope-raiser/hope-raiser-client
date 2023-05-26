import { CircularProgress, Image, Tab } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import { deleteCampaignById } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import DonationCard from "@/components/DonationCard";
import TabDonation from "@/components/TabDonation";
import FormatCurrency from "@/components/FormatCurrency";
import TabComment from "@/components/TabComment";
import Swal from "sweetalert2";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function CampaignDetails({ id }) {
	const [campaign, setCampaign] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [showDonate, setShowDonate] = useState(false);
	const [showUpdateDelete, setShowUpdateDelete] = useState(false);
	const [tabContent, setTabContent] = useState(1);
	const router = useRouter();
	let accessToken = "";
	let dataUser = "";

	if (typeof window !== "undefined") {
		accessToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			dataUser = JSON.parse(storedUser);
		}
	}

	useEffect(() => {
		if (dataUser.id === campaign.userId) {
			setShowUpdateDelete(true);
		} else {
			setShowUpdateDelete(false);
		}
	}, [dataUser, campaign]);

	const fetchCampaign = async () => {
		const data = await getCampaignDetail(id);
		setCampaign(data);
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		fetchCampaign();
	}, []);

	// FORMAT DATE
	const date = new Date(campaign.endDate);
	const formattedDate = date.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const handleDeleteCampaign = async () => {
		const result = await Swal.fire({
			title: "Are You Sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			confirmButtonColor: "#14b8a6",
			cancelButtonColor: "#d33",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
		});
		if (result.isConfirmed) {
			await deleteCampaignById(id);
			await router.push("/");
		}
	};

	if (isLoading) {
		return (
			<>
				<CircularProgress isIndeterminate color="green.300" />
			</>
		);
	}

	function ShowButton() {
		return (
			<>
				<button
					className="bg-Teal text-slate-100 font-semibold text-lg px-4 py-2 rounded-ee-xl me-2 hover:text-Teal hover:bg-slate-100 hover:shadow-sm duration-300 focus:border-b-2 focus:border-Teal border-b-2 border-Teal"
					onClick={() => setTabContent(1)}
				>
					Comments
				</button>
				<button
					className="bg-Teal text-slate-100 font-semibold text-lg px-4 py-2 rounded-ee-xl mb-8 hover:text-Teal hover:bg-slate-100 hover:shadow-sm duration-300 focus:border-b-2 focus:border-Teal border-b-2 border-Teal"
					onClick={() => setTabContent(2)}
				>
					Donations
				</button>
			</>
		);
	}

	return (
		<Layout>
			<div className="bg-slate-50 min-h-screen ">
				{/* SECTION CAMPAIGN */}
				<section className="py-12 px-4 md:px-16 ">
					<div className="container mx-auto ">
						<div className="mx-auto text-center">
							<h1 className="font-bold text-Dark text-3xl md:text-4xl mb-2">
								SUPPORT & DONATE!
							</h1>
						</div>
						<div className="mt-12 flex flex-wrap ">
							<div className="w-full px-4 lg:px-0 lg:w-3/5   ">
								<div className="aspect-video  bg-slate-100 ">
									{campaign.banner.map((banner, idx) => {
										return (
											<>
												<Image
													src={`${banner.image}`}
													fallback="https://placehold.co/1280x720"
													alt="BANNER IMAGE"
													width="full"
													h="full"
													className="object-contain"
												/>
											</>
										);
									})}
								</div>
								<div className="flex gap-4 mx-4">
									{campaign.categories.map((cat) => {
										return (
											<>
												<span className="bg-slate-100 text-base font-semibold text-Dark shadow-sm px-3 py-1 mt-6 rounded-xl cursor-default ring-1 ring-Dark">
													{cat.categories.name}
												</span>
											</>
										);
									})}
								</div>
							</div>
							<div className="w-full lg:w-2/5 px-12 pt-8 lg:pt-0">
								<div className="text-Dark ">
									<h3 className="font-bold text-2xl md:text-3xl pb-2">
										{campaign.title}
									</h3>
									<h5>{campaign.description}</h5>
									<h3 className="font-bold text-Teal text-2xl pt-4 md:text-4xl">
										<FormatCurrency
											amount={campaign.currentDonation}
										/>
									</h3>
									<p className="font-normal text-sm pt-2">
										Target Donation{" "}
										<span className="font-semibold text-base">
											<FormatCurrency
												amount={campaign.goal}
											/>
										</span>
									</p>
									<div className="flex flex-wrap pt-6 gap-12 ">
										<div className="text-center ">
											<p className="font-semibold text-2xl ">
												{campaign.donations.length}
											</p>
											<h4 className="font-normal text-base">
												Donatur
											</h4>
										</div>
										<div className=" text-center ">
											<p className="font-semibold text-2xl ">
												{formattedDate}
											</p>
											<h4 className="font-normal text-base">
												End Date
											</h4>
										</div>
									</div>
									<div className="pt-8">
										{!showDonate ? (
											<button
												onClick={() =>
													setShowDonate(true)
												}
												className="bg-Teal md:w-full rounded-sm px-3 py-2 md:px-4 md:py-2 font-bold text-slate-100  text-sm md:text-xl hover:bg-slate-100 hover:text-Teal hover:ring-1 hover:ring-Teal duration-500"
											>
												DONATE NOW
											</button>
										) : (
											<DonationCard
												id={id}
												setCampaign={setCampaign}
												setShowDonate={setShowDonate}
											/>
										)}
										{accessToken && showUpdateDelete && (
											<>
												<div className="pt-8 flex gap-4 mx-4 text-slate-100 font-semibold">
													<EditIcon
														boxSize={9}
														color={"teal.500"}
														backgroundColor="gray.100"
														p={2}
														borderRadius={"lg"}
														cursor={"pointer"}
														_hover={{
															color: "gray.100",
															backgroundColor:
																"teal.500",
														}}
														transitionDuration={
															"400ms"
														}
														onClick={() =>
															router.push(
																`./${campaign.id}/edit`
															)
														}
														border={"1px"}
														borderColor={"gray.400"}
													/>
													<DeleteIcon
														boxSize={9}
														color={"gray.100"}
														backgroundColor="teal.500"
														p={2}
														borderRadius={"lg"}
														cursor={"pointer"}
														_hover={{
															color: "teal.500",
															backgroundColor:
																"gray.100",
														}}
														transitionDuration={
															"400ms"
														}
														border={"1px"}
														borderColor={"gray.400"}
														onClick={
															handleDeleteCampaign
														}
													/>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* SECTION COMMENTS & DONATIONS */}
				<section className="py-24 px-4 ">
					<div className="container max-w-screen-md 2xl:max-w-screen-lg  mx-auto border-t border-slate-200">
						<ShowButton />
						{tabContent === 1 ? (
							<TabComment
								campaign={campaign}
								fetchCampaign={fetchCampaign}
							/>
						) : (
							<TabDonation campaign={campaign} />
						)}
					</div>
				</section>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const { id } = ctx.query;
	return {
		props: {
			id,
		},
	};
}
