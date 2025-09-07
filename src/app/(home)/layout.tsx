import {Navbar} from "@/modules/home/ui/components/navbar";
interface Props {
    children: React.ReactNode;
};
const Layout = ({children}:Props) => {
    return (
        <main className="flex flex-col min-h-screen max-h-screen">
            <Navbar/>
            <div className="h-full w-full absolute inset-0 -z-10 bg-background dark:bg-[radial-gradient(#39e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background:16px]"/>
            <div className="flex-1 flex flex-col px-4 pb-4">
                {children}
            </div>
        </main>
    );
};

export default Layout;