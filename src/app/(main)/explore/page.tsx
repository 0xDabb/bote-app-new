'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project, Category } from '@/types'

export default function ExplorePage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        try {
            const catRes = await fetch('/api/categories')
            const catData = await catRes.json()
            if (catData.success) {
                setCategories(catData.data)
            }

            const projRes = await fetch('/api/projects?sortBy=upvotes&pageSize=10')
            const projData = await projRes.json()
            if (projData.success) {
                setProjects(projData.data)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatCount = (count: number) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
        }
        return count.toString()
    }

    const categoryIcons: Record<string, string> = {
        'SaaS': 'dns',
        'AI Tools': 'smart_toy',
        'Productivity': 'bolt',
        'Crypto': 'currency_bitcoin',
        'Mobile': 'smartphone',
        'Design': 'palette',
        'DevTools': 'code',
        'Fintech': 'account_balance',
        'Social': 'group',
        'Games': 'sports_esports',
        'Web3': 'token',
        'E-commerce': 'shopping_cart',
    }

    const categoryImages: Record<string, string> = {
        'SaaS': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm8tGVc5LXQgvV8-Du69de7Gj8LX10OBVHOJL2_QIK632M4wNCh4uVFFHMgRGclGEq-cs_cXXBoVqGWBEmzyl1w6cmEThXTyxd7CiuNC0LhZv9bIlJh1oG9U-_22EK6v_DnTw45Ry9XOLzkVR60YiH26ZaCn08zXH0VUYQp4wPXLX8eq3tT1odaGjCB_z6i-txJfceK53UNMcFIH-4LKu0ziIayHGvMCufr_jRkJoZT8RrgRlz3fOqn3fOwdRhw7wUwp2UDkkDTmkB',
        'AI Tools': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPBFNmWRWsh1844BQwwAnWWvHaZ3ngJAi-nDBqnXkzaJKBBAemI5V18Y3GOlGaqh7BlpTlkgTjEf3HfaBjffiZm8LPg0R4GNY5pSK5_qzqx8OqZgrA0TrY2Sb_I9QoV2HchPAUqb6d-XldABEiH_Nls0HLnMH94gfQ1z0QewcX-a2GBAthGmkZqs2Xn_86c_-YxkSQDrFchIQ3dBNk5sM_KHT2MTUxhjLsgjvzDKlT25Gk8Jcvgr-qSePiXmPBY8v4D7OQn_dKiMgY',
        'Productivity': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXSFo3VdxUBM89PsWwtEZAwipxVEQIZJfhw87JezAbO6OvsQEFf1Z_N4WIm0w4msXdHsaSEgL4CJ7ofXzyCtuwfi_1soYh2vYty40BOCPqvzEDbbYHAnARb9kq9zBUjzHenccPkiYemctFty19k9M31Z2yv2Bo7_Qeg3KFz1EI1FHeK1yR2zqbr9dRtERlgwQL46My1hf7HHXAapStOPtXZUtl1sSDS8DLnGlTwUkb_CWkMR3iaUT5Cp7lPtECWYxSiNZNHL_z4m64',
        'Crypto': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK6Y-SYcbH2q24mCUyyfTfTHCvQ_FRhZHO4bEqEjFmikYh5axp9IzITri-J4pSsMRWK0I0FsK16s744un1Jqu0FFKcsvuwtqmbP9FhplnlRPcUjxe6XPYFlF5qaDjQuLE88Sr0PlIgH13co2i2Gxn6bg8OXbjVcDdyP-aJnYz7mEEg8KBei4P6mWDohaJPAvQdcosaOVWKTyGo3ecZAMmGZaVUBFNjH7H_EEjKAjNRggAi0itP9kuo0pFmfvurLU_m8vd6-aE8Isdr',
        'Mobile': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9qCGXmpuo2GZGqZ_g79Ko_EzLAMJ1BCtF4wjwotLFJijC-iHAGFEdzKbZYMbRDRnze9D5P12M5dk6te-h769alTfFmxFb8tWKqu3-PDLIWGjxFmQ4NQuJnPlSvp80dWZa51T_aoAHNVa9c2b2VKMbTNz8U4Wyyn9hQxN7kjpQHWDvgF7Zk2ir6xlq_H-mPeVf-qWrw1ewDTqB76NDPYnu-c6xTpSLm5m04DPCpEF0S05ABLlMnaIEMQAQsc5nJsUbGjFMevczNBE',
    }

    return (
        <div className="min-h-screen pb-24" style={{ background: '#0F0F0F' }}>
            {/* Header */}
            <header
                className="sticky top-0 z-40 w-full pt-4 pb-2 px-4"
                style={{
                    background: 'rgba(15, 15, 15, 0.8)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <h1 className="text-3xl font-bold tracking-tight mb-3 pl-1 text-white">Explore</h1>
                <div className="relative flex w-full items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#49df80' }}>search</span>
                    </div>
                    <input
                        className="block w-full p-4 pl-12 text-sm text-white rounded-xl outline-none"
                        style={{
                            background: '#1A1A1A',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                        placeholder="Search projects, tags, or makers..."
                        type="text"
                    />
                </div>
            </header>

            {/* Categories Bento Grid */}
            <section className="mt-6 px-4">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h2 className="text-xl font-bold text-white">Categories</h2>
                    <button style={{ color: '#49df80' }} className="text-sm font-medium hover:opacity-80 transition-colors">See All</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 5).map((cat, index) => (
                        <Link
                            href={`/?category=${cat.id}`}
                            key={cat.id}
                            className={`group relative overflow-hidden rounded-2xl flex flex-col justify-end p-4 cursor-pointer transition-all ${index === 2 ? 'col-span-2 h-32' : 'aspect-square'
                                }`}
                            style={{
                                background: '#1A1A1A',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60"
                                style={{ backgroundImage: `url('${categoryImages[cat.name] || 'https://picsum.photos/400/400'}')` }}
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)' }} />
                            <div className="relative z-10">
                                {index !== 2 && (
                                    <span className="material-symbols-outlined mb-1" style={{ fontSize: '28px', color: '#49df80' }}>
                                        {categoryIcons[cat.name] || 'category'}
                                    </span>
                                )}
                                <div className={index === 2 ? 'flex items-center justify-between w-full' : ''}>
                                    <div>
                                        <p className="font-bold text-lg leading-tight text-white">{cat.name}</p>
                                        {index === 2 && (
                                            <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>{cat._count?.projects || 0}+ Projects</p>
                                        )}
                                    </div>
                                    {index === 2 && (
                                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#49df80' }}>
                                            {categoryIcons[cat.name] || 'bolt'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trending Projects */}
            <section className="mt-8">
                <div className="flex justify-between items-center mb-4 px-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: '#49df80' }}>local_fire_department</span>
                        <h2 className="text-xl font-bold text-white">Trending Now</h2>
                    </div>
                    <button className="rounded-full p-1 transition-colors hover:opacity-80" style={{ color: '#49df80' }}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
                <div className="flex overflow-x-auto pb-4 pl-4 space-x-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {projects.slice(0, 4).map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="flex-none w-[280px]">
                            <div
                                className="rounded-2xl overflow-hidden group"
                                style={{
                                    background: '#1A1A1A',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <div
                                    className="h-36 w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url('${project.coverImage || 'https://picsum.photos/400/300'}')` }}
                                >
                                    <div className="w-full h-full group-hover:bg-transparent transition-colors" style={{ background: 'rgba(0,0,0,0.2)' }} />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white">{project.name}</h3>
                                        <div className="flex items-center px-2 py-1 rounded-lg" style={{ background: 'rgba(73, 223, 128, 0.1)' }}>
                                            <span className="material-symbols-outlined mr-1" style={{ fontSize: '16px', color: '#49df80' }}>arrow_upward</span>
                                            <span className="font-bold text-xs" style={{ color: '#49df80' }}>{formatCount(project.upvoteCount)}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm line-clamp-2" style={{ color: '#A0A0A0' }}>{project.tagline}</p>
                                    <div className="mt-3 flex gap-2">
                                        <span
                                            className="text-[10px] font-medium px-2 py-1 rounded-md"
                                            style={{
                                                color: 'rgba(255,255,255,0.6)',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}
                                        >
                                            {project.category?.name || 'Project'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="w-2" />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="mt-6 px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">New Arrivals</h2>
                    <button style={{ color: '#49df80' }} className="text-sm font-medium hover:opacity-80 transition-colors">View All</button>
                </div>
                <div className="flex flex-col gap-3">
                    {projects.slice(0, 3).map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id}>
                            <div
                                className="p-3 rounded-2xl flex gap-4 items-center active:scale-[0.98] transition-transform"
                                style={{
                                    background: '#1A1A1A',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <div
                                    className="h-16 w-16 flex-shrink-0 rounded-xl bg-cover bg-center"
                                    style={{ backgroundImage: `url('${project.coverImage || 'https://picsum.photos/100/100'}')` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base text-white truncate">{project.name}</h3>
                                    <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>by {project.creator?.displayName || project.creator?.username}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span
                                            className="text-[10px] px-1.5 py-0.5 rounded"
                                            style={{
                                                color: 'rgba(255,255,255,0.6)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            {project.category?.name || 'Project'}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl h-full min-w-[50px]"
                                    style={{ background: '#0F0F0F' }}
                                >
                                    <span className="material-symbols-outlined text-xl cursor-pointer transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>keyboard_arrow_up</span>
                                    <span className="text-xs font-bold text-white">{formatCount(project.upvoteCount)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Bottom Navigation */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 pb-5 pt-3"
                style={{
                    background: 'rgba(15, 15, 15, 0.8)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <div className="flex justify-around items-center px-2">
                    <Link href="/" className="flex flex-col items-center gap-1 w-16">
                        <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#A0A0A0' }}>home</span>
                        <span className="text-[10px] font-medium" style={{ color: '#A0A0A0' }}>Home</span>
                    </Link>
                    <Link href="/explore" className="flex flex-col items-center gap-1 w-16">
                        <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#49df80', fontVariationSettings: "'FILL' 1" }}>explore</span>
                        <span className="text-[10px] font-medium" style={{ color: '#49df80' }}>Explore</span>
                    </Link>
                    <Link href="/create" className="relative -top-5">
                        <button
                            className="rounded-full p-4 hover:scale-105 transition-transform"
                            style={{
                                background: '#49df80',
                                boxShadow: '0 0 15px rgba(73, 223, 128, 0.3)'
                            }}
                        >
                            <span className="material-symbols-outlined font-bold" style={{ fontSize: '28px', color: 'black' }}>add</span>
                        </button>
                    </Link>
                    <Link href="/notifications" className="flex flex-col items-center gap-1 w-16 relative">
                        <div className="relative">
                            <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#A0A0A0' }}>notifications</span>
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" style={{ border: '1px solid #0F0F0F' }} />
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: '#A0A0A0' }}>Alerts</span>
                    </Link>
                    <Link href="/profile" className="flex flex-col items-center gap-1 w-16">
                        <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#A0A0A0' }}>person</span>
                        <span className="text-[10px] font-medium" style={{ color: '#A0A0A0' }}>Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
