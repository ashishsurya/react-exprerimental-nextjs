import { clerkClient } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export default function getGoogleAccessToken(req, res) {
	const { userId } = req.query as { userId: string };

	let token;

	clerkClient.users
		.getUserOauthAccessToken(userId, "oauth_google")
		.then((x) => {
			token = x[0].token;
		});

	res.status(200).json({ token });
}
