'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'
import { Server, Bot, Smartphone, Bitcoin, Zap, Palette, Code, Landmark, Users, Gamepad2 } from 'lucide-react'

interface CategoryCardProps {
    category: Category
    variant?: 'square' | 'wide'
    backgroundImage?: string
}

// Default background images for categories
const categoryBackgrounds: Record<string, string> = {
    'saas': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    'ai-tools': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    'mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    'crypto': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
    'productivity': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    'design': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
    'devtools': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    'fintech': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
    'social': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    'games': 'https://images.unsplash.com/photo-1493711662062-fa541f7f0b0c?w=400',
}

// Category icons using Lucide React
function getCategoryIcon(slug: string, color: string = '#49df80', size: number = 28) {
    const iconProps = { className: `w-${size === 32 ? 8 : 7} h-${size === 32 ? 8 : 7}`, style: { color } }

    const icons: Record<string, React.ReactNode> = {
        'saas': <Server {...iconProps} />,
        'ai-tools': <Bot {...iconProps} />,
        'mobile': <Smartphone {...iconProps} />,
        'crypto': <Bitcoin {...iconProps} />,
        'productivity': <Zap {...iconProps} />,
        'design': <Palette {...iconProps} />,
        'devtools': <Code {...iconProps} />,
        'fintech': <Landmark {...iconProps} />,
        'social': <Users {...iconProps} />,
        'games': <Gamepad2 {...iconProps} />,
    }

    return icons[slug] || <Zap {...iconProps} />
}

export function CategoryCard({ category, variant = 'square', backgroundImage }: CategoryCardProps) {
    const bgImage = backgroundImage || categoryBackgrounds[category.slug] || categoryBackgrounds['saas']

    if (variant === 'wide') {
        return (
            <Link href={`/explore?category=${category.slug}`}>
                <div className="group col-span-2 relative overflow-hidden rounded-2xl h-32 flex flex-col justify-end p-4 cursor-pointer transition-all"
                    style={{ background: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)' }} />

                    <div className="relative z-10 flex items-center justify-between w-full">
                        <div>
                            <p className="font-bold text-lg leading-tight text-white">{category.name}</p>
                            {category._count && (
                                <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>{category._count.projects}+ Projects</p>
                            )}
                        </div>
                        {getCategoryIcon(category.slug, category.color || '#49df80', 32)}
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link href={`/explore?category=${category.slug}`}>
            <div className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col justify-end p-4 cursor-pointer transition-all"
                style={{ background: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)' }} />

                <div className="relative z-10">
                    <div className="mb-1">
                        {getCategoryIcon(category.slug, category.color || '#49df80', 28)}
                    </div>
                    <p className="font-bold text-lg leading-tight text-white">{category.name}</p>
                </div>
            </div>
        </Link>
    )
}

interface CategoryChipsProps {
    categories: Category[]
    selectedId?: string
    onChange?: (categoryId: string | null) => void
}

export function CategoryChips({ categories, selectedId, onChange }: CategoryChipsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3" style={{ scrollbarWidth: 'none' }}>
            <button
                onClick={() => onChange?.(null)}
                className="flex h-8 shrink-0 items-center px-4 rounded-full font-semibold text-xs"
                style={{
                    background: !selectedId ? '#49df80' : '#1A1A1A',
                    color: !selectedId ? 'black' : '#A0A0A0',
                    border: !selectedId ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                All
            </button>

            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onChange?.(category.id)}
                    className="flex h-8 shrink-0 items-center px-4 rounded-full font-medium text-xs"
                    style={{
                        background: selectedId === category.id ? '#49df80' : '#1A1A1A',
                        color: selectedId === category.id ? 'black' : '#A0A0A0',
                        border: selectedId === category.id ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}
