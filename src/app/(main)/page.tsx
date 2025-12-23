'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import type { Project, Category } from '@/types'

export default function HomePage() {
    const { user } = useAuth()
    const [projects, setProjects] = useState<Project[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [selectedCategory, user])

    async function fetchData() {
        setLoading(true)
        try {
            const catRes = await fetch('/api/categories')
            const catData = await catRes.json()
            if (catData.success) {
                setCategories(catData.data)
            }

            const params = new URLSearchParams({
                sortBy: 'upvotes',
                pageSize: '20',
            })
            if (selectedCategory) {
                params.set('categoryId', selectedCategory)
            }
            if (user?.id) {
                params.set('userId', user.id)
            }

            const projRes = await fetch(`/api/projects?${params}`)
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

    async function handleUpvote(projectId: string, e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        if (!user) return

        try {
            const res = await fetch(`/api/projects/${projectId}/upvote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            })
            if (res.ok) {
                fetchData()
            }
        } catch (error) {
            console.error('Error voting:', error)
        }
    }

    const formatCount = (count: number) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
        }
        return count.toString()
    }

    const featuredProject = projects.find(p => p.featured)
    const regularProjects = projects.filter(p => !p.featured)

    return (
        <div className="min-h-screen" style={{ background: '#0F0F0F' }}>
            {/* Header */}
            <header
                className="fixed top-0 left-0 right-0 z-50 px-4 pt-12 pb-4 flex items-center justify-between gap-4"
                style={{
                    background: 'rgba(26, 26, 26, 0.7)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(73, 223, 128, 0.2)' }}
                    >
                        <span className="material-symbols-outlined text-2xl" style={{ color: '#49df80' }}>poll</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Bote</span>
                </Link>

                <div className="flex-1 max-w-[180px]">
                    <div className="relative h-10 w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-xl" style={{ color: '#A0A0A0' }}>search</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full h-full pl-10 pr-3 py-2 rounded-full border-none text-sm text-white outline-none"
                            style={{
                                background: 'rgba(26, 26, 26, 0.8)',
                                color: 'white'
                            }}
                        />
                    </div>
                </div>

                <Link href="/profile">
                    <button
                        className="w-10 h-10 rounded-full overflow-hidden"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
                    >
                        <div className="w-full h-full flex items-center justify-center" style={{ background: '#1A1A1A', color: '#A0A0A0' }}>
                            <span className="text-sm font-medium">{user?.username?.charAt(0).toUpperCase() || '?'}</span>
                        </div>
                    </button>
                </Link>
            </header>

            {/* Main Content */}
            <main className="pt-32 px-3 space-y-4 pb-28">
                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="flex h-8 shrink-0 items-center px-4 rounded-full font-semibold text-xs active:scale-95 transition-transform"
                        style={{
                            background: !selectedCategory ? '#49df80' : '#1A1A1A',
                            color: !selectedCategory ? 'black' : '#A0A0A0',
                            border: !selectedCategory ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        All
                    </button>
                    <button
                        className="flex h-8 shrink-0 items-center px-4 rounded-full font-medium text-xs active:scale-95 transition-colors"
                        style={{
                            background: '#1A1A1A',
                            color: '#A0A0A0',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        <span className="material-symbols-outlined text-base mr-1" style={{ color: '#facc15' }}>trending_up</span>
                        Trending
                    </button>
                    {categories.slice(0, 4).map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className="flex h-8 shrink-0 items-center px-4 rounded-full font-medium text-xs active:scale-95 transition-all"
                            style={{
                                background: selectedCategory === cat.id ? '#49df80' : '#1A1A1A',
                                color: selectedCategory === cat.id ? 'black' : '#A0A0A0',
                                border: selectedCategory === cat.id ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Featured Project - Full Width */}
                    {featuredProject && (
                        <Link href={`/projects/${featuredProject.id}`} className="col-span-2">
                            <article
                                className="rounded-xl overflow-hidden shadow-lg relative flex flex-row h-32"
                                style={{
                                    background: '#1A1A1A',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                            >
                                <div className="absolute top-2 left-2 z-10">
                                    <span
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
                                        style={{
                                            background: 'rgba(59, 130, 246, 0.2)',
                                            color: '#60a5fa',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        Featured
                                    </span>
                                </div>
                                <div
                                    className="w-1/3 bg-cover bg-center relative h-full"
                                    style={{ backgroundImage: `url('${featuredProject.coverImage || 'https://picsum.photos/200/300'}')` }}
                                >
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(26, 26, 26, 0.8))' }} />
                                </div>
                                <div className="w-2/3 p-3 flex flex-col justify-between z-10">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h2 className="text-base font-bold text-white leading-tight">{featuredProject.name}</h2>
                                            <div
                                                className="flex items-center gap-1 rounded-full px-1.5 py-0.5"
                                                style={{
                                                    background: 'rgba(0, 0, 0, 0.4)',
                                                    backdropFilter: 'blur(8px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                                }}
                                            >
                                                <span className="material-symbols-outlined text-sm" style={{ color: '#49df80' }}>arrow_upward</span>
                                                <span className="text-[10px] font-bold" style={{ color: '#49df80' }}>{formatCount(featuredProject.upvoteCount)}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs line-clamp-2 leading-snug" style={{ color: '#A0A0A0' }}>{featuredProject.tagline}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <div className="flex items-center gap-1.5">
                                            {featuredProject.creator?.avatarUrl ? (
                                                <Image src={featuredProject.creator.avatarUrl} alt="" width={16} height={16} className="rounded-full" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full" style={{ background: '#262626' }} />
                                            )}
                                            <span className="text-[10px]" style={{ color: '#A0A0A0' }}>by {featuredProject.creator?.displayName || featuredProject.creator?.username}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5" style={{ color: '#A0A0A0' }}>
                                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                            <span className="text-[10px] font-medium">{featuredProject._count?.comments || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )}

                    {/* Regular Project Cards */}
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="h-40 rounded-xl animate-pulse" style={{ background: '#1A1A1A' }} />
                        ))
                    ) : (
                        regularProjects.map((project) => (
                            <Link href={`/projects/${project.id}`} key={project.id}>
                                <article
                                    className="rounded-xl overflow-hidden shadow-lg p-3 flex flex-col gap-2 h-full"
                                    style={{
                                        background: '#1A1A1A',
                                        border: '1px solid rgba(255, 255, 255, 0.08)'
                                    }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-2">
                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                                style={{ background: `${project.category?.color || '#49df80'}20` }}
                                            >
                                                <span className="text-lg">{project.category?.icon || '🚀'}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-sm truncate" style={{ maxWidth: '90px' }}>{project.name}</h3>
                                                <span
                                                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium"
                                                    style={{
                                                        background: `${project.category?.color || '#49df80'}15`,
                                                        color: project.category?.color || '#49df80',
                                                        border: `1px solid ${project.category?.color || '#49df80'}30`
                                                    }}
                                                >
                                                    {project.category?.name || 'Project'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] line-clamp-2 leading-relaxed" style={{ color: '#A0A0A0' }}>{project.tagline}</p>
                                    <div className="mt-auto pt-1 flex items-center justify-between">
                                        <div
                                            className="flex items-center rounded-full px-2 py-0.5 gap-1"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.3)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)'
                                            }}
                                        >
                                            <button
                                                onClick={(e) => handleUpvote(project.id, e)}
                                                className="transition-colors"
                                                style={{ color: project.hasUpvoted ? '#49df80' : '#A0A0A0' }}
                                            >
                                                <span className="material-symbols-outlined text-sm block">keyboard_arrow_up</span>
                                            </button>
                                            <span className="text-[10px] font-bold text-white">{formatCount(project.upvoteCount)}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5" style={{ color: '#A0A0A0' }}>
                                            <span className="material-symbols-outlined text-xs">comment</span>
                                            <span className="text-[10px]">{project._count?.comments || 0}</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </div>

                {/* Empty State */}
                {!loading && projects.length === 0 && (
                    <div className="text-center py-12">
                        <p style={{ color: '#A0A0A0' }} className="text-sm">No projects yet.</p>
                        {user && (
                            <Link
                                href="/create"
                                className="inline-block mt-4 px-6 py-2 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                                style={{ background: '#49df80', color: 'black' }}
                            >
                                Create First Project
                            </Link>
                        )}
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl pb-8 pt-4 px-6"
                style={{
                    background: 'rgba(15, 15, 15, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <div className="flex justify-between items-center max-w-md mx-auto">
                    <Link href="/" className="flex flex-col items-center gap-1" style={{ color: '#49df80' }}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>
                    <Link href="/explore" className="flex flex-col items-center gap-1" style={{ color: '#A0A0A0' }}>
                        <span className="material-symbols-outlined text-2xl">explore</span>
                        <span className="text-[10px] font-medium">Explore</span>
                    </Link>
                    <Link href={user ? "/create" : "#"} className="relative -top-6">
                        <button
                            className="rounded-full p-4 transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: '#49df80',
                                color: 'black',
                                boxShadow: '0 0 20px rgba(73, 223, 128, 0.4)'
                            }}
                        >
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </button>
                    </Link>
                    <Link href="/notifications" className="flex flex-col items-center gap-1" style={{ color: '#A0A0A0' }}>
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        <span className="text-[10px] font-medium">Activity</span>
                    </Link>
                    <Link href="/profile" className="flex flex-col items-center gap-1" style={{ color: '#A0A0A0' }}>
                        <span className="material-symbols-outlined text-2xl">person</span>
                        <span className="text-[10px] font-medium">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
