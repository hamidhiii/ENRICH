'use client';

export default function ClinicalTrials() {
    return (
        <section className="py-20 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-bold text-center mb-16 text-slate-600">
                    Klinik sinovlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🧪',
                            title: 'Preklinik tadqiqotlar',
                            description: 'Yangi dori vositalarining xavfsizligi va samaradorligini baholash',
                        },
                        {
                            icon: '👥',
                            title: 'Klinik sinovlar',
                            description: 'Odamlarda dori vositalarining ta\'sirini o\'rganish',
                        },
                        {
                            icon: '📊',
                            title: 'Natijalarni tahlil qilish',
                            description: 'Olingan ma\'lumotlarni chuqur tahlil qilish va xulosa chiqarish',
                        },
                    ].map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition-shadow text-center">
                            <div className="text-7xl mb-6">{item.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-600">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
