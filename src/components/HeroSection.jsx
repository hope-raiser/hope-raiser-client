import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import { EffectFade } from "swiper";
import Link from "next/link";

SwiperCore.use([Navigation, Pagination]);

export default function HeroSection() {
	let token = "";

	const image = [
		{
			id: 1,
			url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
			text: "Vestibulum consectetur aliquet dignissim. Donec semper justo nec diam congue, a auctor justo luctus. Quisque dui purus, aliquam ut rutrum nec, aliquet ac tellus. Sed a mollis dolor.",
		},
		{
			id: 2,
			url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
			text: "Nam egestas dui quis euismod fringilla. Ut porta egestas nulla id iaculis. Nulla non dolor nec lectus imperdiet laoreet in nec massa.",
		},
		{
			id: 3,
			url: "https://images.unsplash.com/photo-1520856990214-7a9e59dd5ff7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			text: "Nullam sed ornare lectus. Donec vel tellus ex. Vestibulum dolor purus, congue sit amet convallis eu, gravida in augue. Praesent eu dui in augue lobortis varius ut eget ligula.",
		},
	];

	if (typeof window !== "undefined") {
		token = window.localStorage.getItem("token");
	}

	return (
		<>
			<div className="w-full h-screen sm:h-[440px] 2xl:h-[600px]">
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					pagination={{ clickable: true }}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					effect={"fade"}
					modules={[EffectFade, Autoplay]}
					className="w-full h-full"
				>
					{image.map((slide) => (
						<SwiperSlide key={slide.id}>
							<div
								className=" bg-cover h-full"
								style={{ backgroundImage: `url(${slide.url})` }}
							>
								<div className="flex flex-col h-full mx-auto px-8 sm:px-24 w-auto max-w-4xl items-center justify-center gap-4 drop-shadow-md">
									<h1 className="font-bold text-5xl lg:text-7xl text-white">
										GATHER HOPE
									</h1>
									<p className="font-normal text-md lg:text-xl text-white max-h-40 max-w-xl break-all">
										{slide.text}
									</p>
									<Link
										href={
											token
												? "campaigns/create"
												: "/login"
										}
									>
										<button className="bg-Teal  rounded-sm px-3 py-2 font-semibold text-slate-100  text-sm md:text-lg hover:bg-teal-600 hover:text-slate-200 duration-300 mt-4">
											Create Campaign
										</button>
									</Link>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
}
