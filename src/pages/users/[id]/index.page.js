import { getUserByid } from "@/modules/fetch/users";
import { CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserDetails({ id }) {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserByid(id);
            setUser(data);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <>
                <CircularProgress isIndeterminate color="green.300" />
            </>
        );
    }

    return (
        <>
        {JSON.stringify(user)}
        </>
    )
}

    export async function getServerSideProps(ctx) {
        const { id } = ctx.query;
        return {
            props: {
                id
            }
        };
    }
    