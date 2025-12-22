'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import { LanguageProvider } from '@/context/LanguageContext';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <LanguageProvider>
            {isAdmin ? (
                children
            ) : (
                <>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <ScrollToTop />
                </>
            )}
        </LanguageProvider>
    );
}
