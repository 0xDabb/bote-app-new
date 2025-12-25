import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all categories (for admin)
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { projects: true }
                }
            },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json({ success: true, data: categories })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 })
    }
}

// POST - Create new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, slug, description, color, icon } = body

        if (!name || !slug) {
            return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description: description || null,
                color: color || '#49df80',
                icon: icon || null
            }
        })

        return NextResponse.json({ success: true, data: category })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 })
    }
}
