import { useClerk } from "@clerk/nextjs";
import { HandleOAuthCallbackParams } from "@clerk/types";
import { useEffect } from "react";

export default function SSOCallbackPage({
	searchParams,
}: { searchParams: HandleOAuthCallbackParams }) {
	const { handleRedirectCallback } = useClerk();

	console.log("FROM SSO Callback Page")

	useEffect(() => {
		void handleRedirectCallback(searchParams);
	}, [searchParams, handleRedirectCallback]);


	return (
		<h1 className="text-6xl">Loading....</h1>
	)
}
