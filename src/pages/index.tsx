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
		return (
			<div className="grid place-items-center h-screen">
				<h1 className="text-6xl ">Loading.....</h1>;
			</div>
		);
	}

	return (
		<div
			className={twMerge(inter.className, " grid place-items-center h-screen")}
		>
			<div className="text-center space-y-3">
				<SignedIn>
					<h1 className="text-7xl">You are signed in!, can stay here</h1>
					<SignOutButton />

					<h3 className="text-4xl">Your account linked to</h3>
					{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
					{user?.primaryEmailAddress?.linkedTo.map((provider) => (
						<p className="capitalize">{provider.type.split("_")[1]}</p>
					))}
				</SignedIn>

				<SignedOut>
					<h1 className="text-7xl">You are not signed in!, can't stay here</h1>
					<SignInButton />
				</SignedOut>
			</div>
		</div>
	);
}
