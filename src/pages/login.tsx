import { useSignIn } from "@clerk/nextjs";

export default function LoginPage() {
	const { isLoaded, signIn } = useSignIn();

	if (!isLoaded) {
		return null;
	}
	async function handleOAuthSignIn({
		strategy,
	}: { strategy: "oauth_google" | "oauth_linkedin" }) {
		await signIn?.authenticateWithRedirect({
			strategy,
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	}

	return (
		<div className="grid place-items-center h-screen">
			<div className="space-y-3">
				<h1>Sign In</h1>
				<p>{signIn.status}</p>
				<button
					type="button"
					onClick={() => handleOAuthSignIn({ strategy: "oauth_google" })}
				>
					Login with google
				</button>

				<br />

				<button
					type="button"
					onClick={() => handleOAuthSignIn({ strategy: "oauth_linkedin" })}
				>
					Login with LinkedIn
				</button>
			</div>
		</div>
	);
}
