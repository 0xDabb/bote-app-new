'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Flame, ChevronRight, ArrowUp, Home, Compass, Plus, Bell, User, Zap } from 'lucide-react'
import type { Project, Category } from '@/types'

export default function ExplorePage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchData() }, [])

    async function fetchData() {
        setLoading(true)
        try {
            const catRes = await fetch('/api/categories')
            const catData = await catRes.json()
            if (catData.success) setCategories(catData.data)

            const projRes = await fetch('/api/projects?sortBy=upvotes&pageSize=10')
            const projData = await projRes.json()
            if (projData.success) setProjects(projData.data)
        } catch (e) { console.error(e) }
        finally { setLoading(false) }
    }

    const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : n.toString()

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingBottom: '120px' }}>

            {/* HEADER */}
            <div style={{ padding: '24px 20px 20px 20px' }}>
                <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>Explore</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '48px', padding: '0 16px', borderRadius: '12px', background: '#161616', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Search style={{ width: '18px', height: '18px', color: '#49df80' }} />
                    <input
                        type="text"
                        placeholder="Search projects, tags, or makers..."
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                </div>
            </div>

            {/* CATEGORIES */}
            <div style={{ padding: '0 20px 24px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>Categories</h2>
                    <button style={{ color: '#49df80', fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>See All</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {categories.slice(0, 4).map((cat) => (
                        <Link href={`/?category=${cat.id}`} key={cat.id} style={{ textDecoration: 'none' }}>
                            <div style={{ borderRadius: '16px', padding: '16px', background: '#161616', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#49df8020', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                    <Zap style={{ width: '16px', height: '16px', color: '#49df80' }} />
                                </div>
                                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* TRENDING */}
            <div style={{ padding: '0 20px 24px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Flame style={{ width: '18px', height: '18px', color: '#49df80' }} />
                        <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>Trending Now</h2>
                    </div>
                    <ChevronRight style={{ width: '20px', height: '20px', color: '#49df80' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
                    {projects.slice(0, 4).map((p) => (
                        <Link href={`/projects/${p.id}`} key={p.id} style={{ textDecoration: 'none', flexShrink: 0, width: '220px' }}>
                            <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#161616' }}>
                                <div style={{ height: '100px', backgroundImage: p.coverImage ? `url(${p.coverImage})` : 'linear-gradient(135deg, #2a4a3a, #1a2a22)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                <div style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                        <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, margin: 0 }}>{p.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#49df8020', padding: '4px 8px', borderRadius: '8px' }}>
                                            <ArrowUp style={{ width: '12px', height: '12px', color: '#49df80' }} />
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#49df80' }}>{fmt(p.upvoteCount)}</span>
                                        </div>
                                    </div>
                                    <p style={{ color: '#888', fontSize: '11px', margin: 0, lineHeight: 1.4 }}>{p.tagline}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* NEW ARRIVALS */}
            <div style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>New Arrivals</h2>
                    <button style={{ color: '#49df80', fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projects.slice(0, 3).map((p) => (
                        <Link href={`/projects/${p.id}`} key={p.id} style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', borderRadius: '16px', background: '#161616' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundImage: p.coverImage ? `url(${p.coverImage})` : 'linear-gradient(135deg, #2a4a3a, #1a2a22)', backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, margin: 0 }}>{p.name}</h3>
                                    <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>by {p.creator?.displayName || 'User'}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '8px', borderRadius: '10px', background: '#0a0a0a' }}>
                                    <ArrowUp style={{ width: '14px', height: '14px', color: '#888' }} />
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{fmt(p.upvoteCount)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* BOTTOM NAV */}
            <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 24px 32px 24px', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '360px', margin: '0 auto' }}>
                    <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
                        <Home style={{ width: '24px', height: '24px', color: '#666' }} />
                        <span style={{ fontSize: '10px', color: '#666' }}>Home</span>
                    </Link>
                    <Link href="/explore" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
                        <Compass style={{ width: '24px', height: '24px', color: '#49df80', fill: '#49df80' }} />
                        <span style={{ fontSize: '10px', color: '#49df80' }}>Explore</span>
                    </Link>
                    <Link href="/create" style={{ position: 'relative', top: '-20px', textDecoration: 'none' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#49df80', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(73,223,128,0.4)' }}>
                            <Plus style={{ width: '28px', height: '28px', color: '#000', strokeWidth: 2.5 }} />
                        </div>
                    </Link>
                    <Link href="/notifications" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
                        <Bell style={{ width: '24px', height: '24px', color: '#666' }} />
                        <span style={{ fontSize: '10px', color: '#666' }}>Activity</span>
                    </Link>
                    <Link href="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
                        <User style={{ width: '24px', height: '24px', color: '#666' }} />
                        <span style={{ fontSize: '10px', color: '#666' }}>Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
