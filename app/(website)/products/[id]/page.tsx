'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { ArrowLeft, Pill, FileText, AlertTriangle, Thermometer } from 'lucide-react';
import { productsAPI, Product, getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

type Params = Promise<{ id: string }>;

export default function ProductDetailPage({ params }: { params: Params }) {
    const { id } = use(params);
    const router = useRouter();
    const { language } = useLanguage();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Try to fetch by slug first, if it fails try by ID
                let response;
                const isNumericId = !isNaN(parseInt(id));

                if (isNumericId) {
                    // It's an ID - fetch the product and redirect to slug
                    response = await productsAPI.getById(parseInt(id));
                    const productData = response.data as Product;

                    // Redirect to slug-based URL
                    if (productData.slug) {
                        router.replace(`/products/${productData.slug}`);
                        return;
                    }
                } else {
                    // It's a slug
                    response = await productsAPI.getBySlug(id);
                }

                setProduct(response.data as Product);
            } catch (error) {
                console.error('Error fetching product:', error);
                router.push('/products');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    if (!product) return null;

    const name = language === 'uz' ? product.name_uz : (product.name_ru || product.name_uz);
    const instructions = language === 'uz' ? product.instructions_uz : (product.instructions_ru || product.instructions_uz);
    const composition = language === 'uz' ? product.composition_uz : (product.composition_ru || product.composition_uz);
    const storage = language === 'uz' ? product.storage_conditions_uz : (product.storage_conditions_ru || product.storage_conditions_uz);
    const sideEffects = language === 'uz' ? product.side_effects_uz : (product.side_effects_ru || product.side_effects_uz);

    // Use product image for header background or fallback
    const headerImage = getImageUrl(product.image) || '/images/hero-bg.jpg';

    return (
        <>
            <Head>
                <title>{name} - ENRICH</title>
                <meta name="description" content={instructions?.substring(0, 160) || `${name} - ${product.form}`} />
                <meta name="keywords" content={`${name}, ${product.form}, таблетки, лекарства, фармацевтика, ENRICH`} />
                <meta property="og:title" content={`${name} - ENRICH`} />
                <meta property="og:description" content={instructions?.substring(0, 160) || `${name} - ${product.form}`} />
                <meta property="og:image" content={headerImage} />
                <meta property="og:type" content="product" />
            </Head>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Header with Product Image Background */}
                <div
                    className="h-[50vh] relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${headerImage})`,
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {name}
                        </h1>
                        <div className="inline-flex items-center gap-2 bg-lime-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            <Pill size={16} />
                            <span className="capitalize">{product.form}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-12 -mt-20 relative z-20">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 mb-8 transition-colors font-medium"
                        >
                            <ArrowLeft size={20} />
                            {language === 'uz' ? 'Ortga qaytish' : 'Назад'}
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Description/Instructions */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-lime-100 text-lime-600 rounded-xl">
                                            <FileText size={24} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800">
                                            {language === 'uz' ? "Qo'llash bo'yicha yo'riqnoma" : 'Инструкция по применению'}
                                        </h2>
                                    </div>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                        {instructions || (language === 'uz' ? "Ma'lumot mavjud emas" : 'Нет информации')}
                                    </div>
                                </section>

                                {/* Composition */}
                                {composition && (
                                    <section className="border-t pt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                                <Pill size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800">
                                                {language === 'uz' ? 'Tarkibi' : 'Состав'}
                                            </h2>
                                        </div>
                                        <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                            {composition}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-8">
                                {/* Product Image Card */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-sm relative">
                                        {product.image ? (
                                            <Image
                                                src={getImageUrl(product.image)}
                                                alt={name}
                                                fill
                                                className="object-contain p-4"
                                            />
                                        ) : (
                                            <Pill size={64} className="text-gray-300" />
                                        )}
                                    </div>
                                </div>

                                {/* Storage Conditions */}
                                {storage && (
                                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                                        <div className="flex items-center gap-3 mb-4 text-orange-600">
                                            <Thermometer size={24} />
                                            <h3 className="font-bold text-lg">
                                                {language === 'uz' ? 'Saqlash sharoiti' : 'Условия хранения'}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-line">{storage}</p>
                                    </div>
                                )}

                                {/* Side Effects */}
                                {sideEffects && (
                                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                                        <div className="flex items-center gap-3 mb-4 text-red-600">
                                            <AlertTriangle size={24} />
                                            <h3 className="font-bold text-lg">
                                                {language === 'uz' ? 'Nojo\'ya ta\'sirlari' : 'Побочные эффекты'}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-line">{sideEffects}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
