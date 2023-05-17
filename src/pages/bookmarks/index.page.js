import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Heading, Button } from "@chakra-ui/react";
import { getAllBookmark } from "@/modules/fetch/bookmarks";

function Bookmark() {
	const [bookmarks, setBookmarks] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		Promise.all([getAllBookmark()]).then((values) => {
			setBookmarks(...values);
			setLoading(false);
		});
	}, []);
	if (isLoading) {
		return (
			<>
				<h1>IS LOADINGGGGG........</h1>
			</>
		);
	}

	return (
		<>
			<Layout>
				<Heading>Ini halaman tersimpan</Heading>
			</Layout>
		</>
	);
}

export default Bookmark;
