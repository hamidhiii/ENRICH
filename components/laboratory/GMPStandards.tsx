'use client';

export default function GMPStandards() {
    return (
        <section className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-bold text-center mb-16 text-slate-600">
                    GMP standartlari
                </h2>
                <div className="bg-white rounded-3xl p-12 shadow-lg max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="text-8xl mb-6">🏆</div>
                        <h3 className="text-3xl font-bold mb-4 text-slate-600">
                            Good Manufacturing Practice
                        </h3>
                        <p className="text-gray-600 text-lg">
                            Yaxshi ishlab chiqarish amaliyoti standartlari
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            'Toza va steril ishlab chiqarish zonalari',
                            'Zamonaviy ventilyatsiya tizimlari',
                            'Avtomatlashtirilgan nazorat tizimlari',
                            'Malakali xodimlar tayyorlash',
                            'Hujjatlashtirish va hisobot berish',
                            'Doimiy monitoring va audit',
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                                <span className="text-gray-700 text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
