import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/actions.user";
import Image from "next/image";
import { redirect } from "next/navigation";

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const loggedIn = await getLoggedInUser();
    if (!loggedIn) {
        redirect('/sign-up')
    }
    return (
        <main className="md:flex h-screen w-full font-inter ">
            <SideBar user={loggedIn} />
            <div className="md:hidden flex size-full flex-col">
                <Image alt="logo" src="/icons/logo.svg" width={30} height={30} />
                <div>
                    <MobileNav user={loggedIn} />
                </div>
            </div>
            {children}
        </main>
    );
}

export default RootLayout;
