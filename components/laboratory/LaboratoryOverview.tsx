'use client';

export default function LaboratoryOverview() {
    return (
        <section className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="bg-gradient-to-br from-lime-500 to-lime-700 rounded-3xl h-96 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="text-9xl mb-6">🔬</div>
                            <p className="text-3xl font-bold">Zamonaviy laboratoriya</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            Bizning laboratoriya
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            ENRICH kompaniyasining zamonaviy laboratoriyasi eng so&apos;nggi texnologiyalar va
                            uskunalar bilan jihozlangan. Bizning mutaxassislar jamoasi har bir mahsulotning
                            sifati va xavfsizligini ta&apos;minlash uchun qat&apos;iy nazorat o&apos;tkazadi.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Laboratoriyamiz xalqaro standartlarga muvofiq ishlaydi va barcha zarur
                            sertifikatlarga ega.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
