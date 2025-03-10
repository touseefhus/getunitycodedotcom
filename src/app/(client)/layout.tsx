// app/(client)/layout.tsx
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import NextTopLoader from 'nextjs-toploader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar cartDetails={0} wishlistDetails={0} />
            <NextTopLoader />
            {children}
            <Footer />
        </>
    );
}