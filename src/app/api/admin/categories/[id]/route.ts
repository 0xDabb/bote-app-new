import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single category
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { projects: true }
                }
            }
        })

        if (!category) {
            return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: category })
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch category' }, { status: 500 })
    }
}

// PATCH - Update category
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const category = await prisma.category.update({
            where: { id },
            data: body
        })

        return NextResponse.json({ success: true, data: category })
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 })
    }
}

// DELETE - Delete category
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Check if category has projects
        const projectCount = await prisma.project.count({
            where: { categoryId: id }
        })

        if (projectCount > 0) {
            return NextResponse.json({
                success: false,
                error: `Cannot delete category with ${projectCount} projects. Remove projects first.`
            }, { status: 400 })
        }

        await prisma.category.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: 'Category deleted' })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 })
    }
}
