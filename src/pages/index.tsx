import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
	useClerk,
	useUser,
	clerkClient,
} from "@clerk/nextjs";
import { ExternalAccountResource } from "@clerk/types";

export default function Home() {
	const { user, isLoaded: isAuthStatusLoaded } = useUser();

	// console.log(user);

	const getGoogleOAuthToken = async ({ userId }: { userId: string }) => {
		const res = await fetch(`/api/token/google?userId=${userId}`);
		const data = await res.json();
		console.log(data);
	};

	if (!isAuthStatusLoaded) {
		return (
			<div className="grid place-items-center h-screen">
				<h1 className="text-6xl ">Loading.....</h1>;
			</div>
		);
	}

	return (
		<div className={twMerge(" grid place-items-center h-screen")}>
			<div className=" space-y-3">
				<SignedIn>
					<h1 className="text-6xl">Welcome, {user?.fullName}</h1>
					<SignOutButton />
					<br />

					<h3>Your account linked to</h3>
					{/* <pre className="text-[8px]">{JSON.stringify(user, null, 2)}</pre> */}
					{/* {user?.primaryEmailAddress?.linkedTo.map((provider) => (
						<p key={provider.id} className="capitalize">
							{provider.type.split("_")[1]}
						</p>
					))} */}

					<button
						type="button"
						onClick={() => getGoogleOAuthToken({ userId: user?.id as string })}
					>
						get google oauth token
					</button>

					<ConnectedAccounts accounts={user?.externalAccounts} />
				</SignedIn>

				<SignedOut>
					<h1>You are not signed in!, can't stay here</h1>
					<SignInButton />
				</SignedOut>
			</div>
		</div>
	);
}

interface ConnectedAccountProps {
	accounts: ExternalAccountResource[] | undefined;
}

const ConnectedAccounts: React.FC<ConnectedAccountProps> = ({ accounts }) => {
	if (accounts === undefined) {
		return (
			<p className="text-xl text-red-600">
				Account not linked to Twitter, LinkedIn etc.....
			</p>
		);
	}
	return (
		<div className=" divide-y-2">
			{/* <pre>{JSON.stringify(accounts, null, 2)}</pre> */}
			{accounts.map((account) => (
				<div className="flex items-center space-x-3 py-4">
					<img
						src={account.avatarUrl}
						loading="lazy"
						alt=""
						className="w-10 h-10 rounded-full"
					/>
					<p className="capitalize">{account.provider}</p>
				</div>
			))}
		</div>
	);
};
