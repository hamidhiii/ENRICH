'use client';

import AboutHero from '@/components/about/AboutHero';
import CompanyHistory from '@/components/about/CompanyHistory';
import MissionVision from '@/components/about/MissionVision';
import ProductionCapacity from '@/components/about/ProductionCapacity';
import LaboratoryPreview from '@/components/about/LaboratoryPreview';
import CertificatesPreview from '@/components/about/CertificatesPreview';

export default function About() {
    return (
        <div className="pt-32">
            <AboutHero />
            <CompanyHistory />
            <MissionVision />
            <ProductionCapacity />
            <LaboratoryPreview />
            <CertificatesPreview />
        </div>
    );
}
