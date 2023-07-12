import Image from "next/image";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	useUser,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { user, isLoaded: isAuthStatusLoaded } = useUser();

	console.log(user);

	if (!isAuthStatusLoaded) {
		return <h1 className="text-9xl">Loading.....</h1>;
	}

	return (
		<div
			className={twMerge(inter.className, " grid place-items-center h-screen")}
		>
			<div className="">
				<SignedIn>
					<p>You are signed in!, can stay here</p>
					<SignOutButton />

					<h3 className="text-4xl">Your account linked to</h3>
					{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
					{user?.primaryEmailAddress?.linkedTo.map((provider) => (
						<p className="capitalize">{provider.type.split("_")[1]}</p>
					))}
				</SignedIn>

				<SignedOut>
					<p>You are not signed in!, can't stay here</p>
					<SignInButton />
				</SignedOut>
			</div>
		</div>
	);
}
