'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp, MessageCircle, Bookmark, MoreHorizontal, Zap, Droplets } from 'lucide-react'
import { cn, formatNumber, formatTimeAgo } from '@/lib/utils'
import { getCategoryIcon } from '@/components/categories/CategoryCard'
import type { Project } from '@/types'

interface ProjectCardProps {
    project: Project
    variant?: 'default' | 'featured' | 'compact' | 'list'
    onUpvote?: () => void
    onSave?: () => void
}

export function ProjectCard({
    project,
    variant = 'default',
    onUpvote,
    onSave
}: ProjectCardProps) {
    const {
        id,
        name,
        tagline,
        coverImage,
        logoImage,
        creator,
        category,
        upvoteCount,
        _count,
        featured,
        createdAt,
        hasUpvoted,
        hasSaved
    } = project

    // Featured variant - Matches "Apollo AI" card from reference
    if (featured || variant === 'featured') {
        return (
            <article className="col-span-2 bg-[#141414] rounded-[32px] overflow-hidden relative flex flex-row h-[200px] border border-[#222]">
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#49df80]/10 text-[#49df80] backdrop-blur-md border border-[#49df80]/20">
                        Featured
                    </span>
                </div>

                {/* Image Section (Left) */}
                <div className="w-[45%] relative h-full">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-black" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#141414]/50 to-[#141414]" />
                </div>

                {/* Content Section (Right) */}
                <div className="w-[55%] p-6 flex flex-col justify-between relative z-10 pl-0">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <Link href={`/projects/${id}`}>
                                <h2 className="text-2xl font-bold text-white hover:text-[#49df80] transition-colors leading-tight">
                                    {name}
                                </h2>
                            </Link>

                            {/* Upvote Pill (Top Right in Ref) */}
                            <button
                                onClick={(e) => { e.preventDefault(); onUpvote?.() }}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all text-xs font-bold",
                                    hasUpvoted
                                        ? "bg-[#49df80] text-black"
                                        : "bg-[#222] text-[#49df80] hover:bg-[#2a2a2a] border border-[#333]"
                                )}
                            >
                                <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
                                <span>{formatNumber(upvoteCount)}</span>
                            </button>
                        </div>

                        <p className="text-[#888] text-sm leading-relaxed line-clamp-3 mb-4">
                            {tagline}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#222] pt-4">
                        <div className="flex items-center gap-2">
                            {creator?.avatarUrl ? (
                                <Image
                                    src={creator.avatarUrl}
                                    alt={creator.displayName || ''}
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                            )}
                            <span className="text-xs text-[#666] font-medium">
                                by {creator?.displayName || creator?.username}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#666]">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">{_count?.comments || 128}</span>
                        </div>
                    </div>
                </div>
            </article>
        )
    }

    // Default Grid Card - Matches "Superlist", "HabitTracker" style from reference
    // Styles: Dark rounded-3xl card, colored icon circle top-left, content middle, stats bottom.
    return (
        <article className="bg-[#141414] rounded-[28px] p-5 flex flex-col justify-between h-[220px] relative group border border-[#222] hover:border-[#333] transition-colors">
            {/* Top Row: Icon & Badges */}
            <div className="flex justify-between items-start mb-3">
                {/* Logo/Icon in Colored Circle */}
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                        background: category?.color ? `${category.color}15` : '#49df8015',
                    }}
                >
                    {logoImage ? (
                        <Image src={logoImage} alt={name} width={20} height={20} className="rounded-sm" />
                    ) : (
                        <div className="text-opacity-90">
                            {category ? getCategoryIcon(category.slug, category.color || '#49df80', 20) : <Zap className="w-5 h-5 text-[#49df80]" />}
                        </div>
                    )}
                </div>


            </div>

            {/* Middle: Content */}
            <div className="mb-auto">
                <Link href={`/projects/${id}`}>
                    <h3 className="font-bold text-lg text-white mb-1.5 leading-tight hover:text-[#49df80] transition-colors">
                        {name}
                    </h3>
                </Link>
                {/* Category Subtitle (like "Wellness" in HabitTracker) */}
                <p className="text-[#555] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {category?.name || 'Product'}
                </p>
                <p className="text-[#888] text-xs leading-relaxed line-clamp-2">
                    {tagline}
                </p>
            </div>

            {/* Bottom: Upvote Only (Right Aligned) */}
            <div className="flex items-center justify-end pt-4 mt-1 border-t border-[#222]">
                <button
                    onClick={(e) => { e.preventDefault(); onUpvote?.() }}
                    className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all text-xs font-bold",
                        hasUpvoted
                            ? "bg-[#49df80] text-black"
                            : "bg-[#222] text-[#49df80] hover:bg-[#2a2a2a] border border-[#333]"
                    )}
                >
                    <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
                    <span>{formatNumber(upvoteCount)}</span>
                </button>
            </div>


        </article>
    )
}
