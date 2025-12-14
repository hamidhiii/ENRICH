'use client';

export default function QualityControl() {
    return (
        <section className="py-20 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-slate-600">
                            Sifat nazorati
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            Har bir mahsulot ishlab chiqarish jarayonining barcha bosqichlarida
                            qat'iy sifat nazoratidan o'tadi:
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Xom ashyoni qabul qilish va tekshirish',
                                'Ishlab chiqarish jarayonini monitoring qilish',
                                'Tayyor mahsulotni sinovdan o\'tkazish',
                                'Saqlash sharoitlarini nazorat qilish',
                                'Yaroqlilik muddatini kuzatish',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-lime-500">
                                        <span className="text-white font-bold">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-700 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl h-96 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="text-9xl mb-6">✓</div>
                            <p className="text-3xl font-bold">100% Sifat kafolati</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
