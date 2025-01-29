import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = { firstName: 'Darshan', lastName: 'GK'};
    return (
        <main className="md:flex h-screen w-full font-inter ">
            <SideBar user = {loggedIn} />
            <div className="md:hidden flex size-full flex-col">
                <Image alt="logo" src="/icons/logo.svg" width={30} height={30} />
                <div>
                    <MobileNav user = {loggedIn} />
                </div>
            </div>
            {children}
        </main>
    );
}
