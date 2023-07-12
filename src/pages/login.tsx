import { useSignIn } from "@clerk/nextjs";

export default function LoginPage() {
	const { isLoaded, signIn } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	async function handleGoogleSignIn() {
		await signIn?.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	}

	async function handleLinkdedInSignIn() {
		await signIn?.authenticateWithRedirect({
			strategy: "oauth_linkedin",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	}

	return (
		<div className="grid place-items-center h-screen">
			<div className="space-y-3">
				<h2 className="text-4xl">Sign In</h2>
				<p>{signIn.status}</p>
				<button type="button" onClick={handleGoogleSignIn}>
					Login with google
				</button>

        <br />

				<button type="button" onClick={handleLinkdedInSignIn}>
					Login with LinkedIn
				</button>
			</div>
		</div>
	);
}
