'use client';

import LaboratoryHero from '@/components/laboratory/LaboratoryHero';
import LaboratoryOverview from '@/components/laboratory/LaboratoryOverview';
import ClinicalTrials from '@/components/laboratory/ClinicalTrials';
import QualityControl from '@/components/laboratory/QualityControl';
import GMPStandards from '@/components/laboratory/GMPStandards';
import Equipment from '@/components/laboratory/Equipment';

export default function Laboratory() {
    return (
        <div className="">
            <LaboratoryHero />
            <LaboratoryOverview />
            <ClinicalTrials />
            <QualityControl />
            <GMPStandards />
            <Equipment />
        </div>
    );
}
