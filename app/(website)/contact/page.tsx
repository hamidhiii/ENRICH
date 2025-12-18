'use client';

import ContactHero from '@/components/contact/ContactHero';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import ContactFormSection from '@/components/contact/ContactFormSection';

export default function Contact() {
    return (
        <div className="pt-32">
            <ContactHero />
            <ContactInfoCards />
            <ContactFormSection />
        </div>
    );
}
