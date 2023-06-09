import { Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";

function Footer() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const token = window.localStorage.getItem("token");

			if (token) {
				setIsLogin(true);
			}
		}
	}, []);

	return (
		<footer className="bg-Dark pt-4 sticky bottom-0 w-full">
			<div className="container mx-auto">
				<div className="flex flex-wrap gap-12 px-12 py-16   lg:justify-between items-center">
					<div className="w-full lg:w-1/3 ">
						<div className="flex px-2 items-center">
							<Image
								src="/logo.png"
								fallback="https://placehold.co/75"
								alt="LOGO"
								className="text-slate-300"
								boxSize="75px"
							/>
							<div className="flex flex-wrap flex-col px-4 text-center break-all">
								<h2 className="text-Teal text-2xl font-bold tracking-wider">
									HOPERAISER
								</h2>
								<span className="text-slate-200 text-xs mt-1 tracking-widest ">
									&quot;Empowering Hope, Fueling
									Progress&quot;
								</span>
							</div>
						</div>
						<div className="pt-4 md:pt-8 md:w-2/3">
							<p className="text-slate-300 text-sm font-light">
								HopeRaiser is dedicated to keeping your hope
								alive by raising money for whatever your cause
								may be.
							</p>
						</div>
					</div>
					<div className="w-full lg:w-1/3 ">
						<h3 className="text-Teal text-xl  font-normal tracking-wider mb-4">
							NAVIGATION
						</h3>
						<div className="mx-auto ">
							<ul className="text-slate-300 text-md ">
								<li className="flex flex-wrap flex-col gap-2 lg:gap-4 w-full">
									<Link
										href="/"
										className="hover:text-Teal duration-300"
									>
										Homepage
									</Link>
									<Link
										href="/categories"
										className="hover:text-Teal duration-300"
									>
										Categories
									</Link>
									<Link
										href={
											isLogin
												? "/users/bookmark"
												: "/login"
										}
										className="hover:text-Teal duration-300"
									>
										Saved
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full lg:w-auto ">
						<h2 className="text-Teal text-xl md:px-4 font-normal tracking-wide">
							FOLLOW US
						</h2>
						<div className="flex flex-col md:flex-row  gap-4 md:gap-12 pt-8 md:pt-4  ">
							<div className="flex flex-wrap flex-col gap-4 ">
								{/* INSTAGRAM ICON */}
								<div className="flex items-center cursor-default">
									<Link
										href="https://www.instagram.com/?hl=id"
										target="_blank"
										className="rounded-full w-9 h-9 flex justify-center items-center border-2 border-slate-300 text-slate-300 hover:border-Teal hover:bg-slate-300 hover:text-Dark"
									>
										<svg
											role="img"
											width="16"
											className="fill-current"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Instagram</title>
											<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
										</svg>
									</Link>
									<span className="text-slate-300 px-2">
										Instagram
									</span>
								</div>
								{/* FACEBOOK */}
								<div className="flex  items-center cursor-default">
									<Link
										href="https://id-id.facebook.com/"
										target="_blank"
										className="rounded-full w-9 h-9 flex justify-center items-center border-2 border-slate-300 text-slate-300 hover:border-Teal hover:bg-slate-300 hover:text-Dark"
									>
										<svg
											role="img"
											width="16"
											className="fill-current"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Facebook</title>
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
										</svg>
									</Link>
									<span className="text-slate-300 px-2">
										Facebook
									</span>
								</div>
								{/* TWTITER */}
								<div className="flex  items-center cursor-default">
									<Link
										href="https://twitter.com/?lang=id"
										target="_blank"
										className="rounded-full w-9 h-9 flex justify-center items-center border-2 border-slate-300 text-slate-300 hover:border-Teal hover:bg-slate-300 hover:text-Dark"
									>
										<svg
											role="img"
											width="16"
											className="fill-current"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Twitter</title>
											<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
										</svg>
									</Link>
									<span className="text-slate-300 px-2">
										Twitter
									</span>
								</div>
							</div>
							<div className="flex flex-wrap flex-col gap-4">
								{/* YOUTUBE */}
								<div className="flex  items-center cursor-default">
									<Link
										href="https://www.youtube.com/"
										target="_blank"
										className="rounded-full w-9 h-9 flex justify-center items-center border-2 border-slate-300 text-slate-300 hover:border-Teal hover:bg-slate-300 hover:text-Dark"
									>
										<svg
											role="img"
											width="16"
											className="fill-current"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>YouTube</title>
											<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
										</svg>
									</Link>
									<span className="text-slate-300 px-2">
										Youtube
									</span>
								</div>
								{/* TIKTOK */}
								<div className="flex  items-center cursor-default">
									<Link
										href="https://www.tiktok.com/"
										target="_blank"
										className="rounded-full w-9 h-9 flex justify-center items-center border-2 border-slate-300 text-slate-300 hover:border-Teal hover:bg-slate-300 hover:text-Dark"
									>
										<svg
											role="img"
											width="16"
											className="fill-current"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>TikTok</title>
											<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
										</svg>
									</Link>
									<span className="text-slate-300 px-2">
										TikTok
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full py-4  text-slate-300 border-t border-neutral-500">
					<p className="text-center font-semibold">
						Copyright &copy;HopeRaiser - 2023{" "}
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
