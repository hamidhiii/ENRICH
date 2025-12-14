'use client';

export default function Equipment() {
    return (
        <section className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-bold text-center mb-16 text-slate-600">
                    Zamonaviy uskunalar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: '⚗️', name: 'HPLC' },
                        { icon: '🔬', name: 'Mikroskoplar' },
                        { icon: '🧬', name: 'Spektrofotometrlar' },
                        { icon: '⚖️', name: 'Analitik tarozilar' },
                    ].map((item, index) => (
                        <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-xl transition-shadow">
                            <div className="text-7xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-slate-600">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
