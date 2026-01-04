
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Categories Data
const categories = [
    { name: 'SaaS', slug: 'saas', icon: 'dns', color: '#3B82F6', order: 1 },
    { name: 'AI Tools', slug: 'ai-tools', icon: 'smart_toy', color: '#8B5CF6', order: 2 },
    { name: 'Productivity', slug: 'productivity', icon: 'bolt', color: '#EAB308', order: 3 },
    { name: 'Crypto', slug: 'crypto', icon: 'currency_bitcoin', color: '#F97316', order: 4 },
    { name: 'Mobile', slug: 'mobile', icon: 'smartphone', color: '#10B981', order: 5 },
    { name: 'Design', slug: 'design', icon: 'palette', color: '#EC4899', order: 6 },
    { name: 'DevTools', slug: 'devtools', icon: 'code', color: '#06B6D4', order: 7 },
    { name: 'Fintech', slug: 'fintech', icon: 'account_balance', color: '#22C55E', order: 8 },
    { name: 'Social', slug: 'social', icon: 'group', color: '#6366F1', order: 9 },
    { name: 'Games', slug: 'games', icon: 'sports_esports', color: '#EF4444', order: 10 },
    { name: 'Web3', slug: 'web3', icon: 'token', color: '#A855F7', order: 11 },
    { name: 'E-commerce', slug: 'ecommerce', icon: 'shopping_cart', color: '#14B8A6', order: 12 },
]

async function main() {
    console.log('🌱 Seeding database with categories only...')

    // 1. Clear existing data safely
    console.log('🧹 Clearing existing data...')
    // Note: We use deleteMany() to clear tables without dropping them
    await prisma.notification.deleteMany()
    await prisma.savedProject.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.upvote.deleteMany()
    await prisma.project.deleteMany()
    // We don't delete users yet as they might own projects, but if projects are gone, users can be deleted
    // await prisma.user.deleteMany() 

    // Deleting categories last
    await prisma.category.deleteMany()

    // 2. Insert Categories
    console.log('📂 Creating categories...')
    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: category,
            create: category,
        })
        console.log(`   ✅ Category: ${category.name}`)
    }

    // 3. Create Admin User
    console.log('👤 Creating admin user...')
    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            fid: 999999,
            username: 'admin',
            displayName: 'Bote Admin',
            avatarUrl: 'https://github.com/shadcn.png',
        }
    })
    console.log('   ✅ Admin user created')

    // 4. Create Sample Farcaster Users
    console.log('👥 Creating sample users...')
    const sampleUsers = [
        {
            fid: 3,
            username: 'dwr',
            displayName: 'Dan Romero',
            bio: 'Co-founder of Farcaster. Building the future of social.',
            avatarUrl: 'https://i.imgur.com/J3kLLxI.png',
            upvoteCount: 1250
        },
        {
            fid: 5650,
            username: 'vitalik',
            displayName: 'Vitalik Buterin',
            bio: 'Ethereum co-founder. Exploring decentralized systems.',
            avatarUrl: 'https://i.imgur.com/gF8Bges.png',
            upvoteCount: 2100
        },
        {
            fid: 6806,
            username: 'horsefacts',
            displayName: 'horsefacts.eth',
            bio: 'Building cool stuff on Farcaster',
            avatarUrl: 'https://i.imgur.com/7myBO3M.png',
            upvoteCount: 890
        },
        {
            fid: 2,
            username: 'jessepollak',
            displayName: 'Jesse Pollak',
            bio: 'Head of Base at Coinbase. Bringing the world onchain.',
            avatarUrl: 'https://i.imgur.com/N8kR7Wr.png',
            upvoteCount: 1540
        },
        {
            fid: 4823,
            username: 'linda',
            displayName: 'Linda Xie',
            bio: 'Co-founder of Scalar Capital. Crypto investor.',
            avatarUrl: 'https://i.imgur.com/qZVjWvm.png',
            upvoteCount: 720
        },
        {
            fid: 1234,
            username: 'balajis',
            displayName: 'Balaji Srinivasan',
            bio: 'Former CTO of Coinbase. Author of The Network State.',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=balaji',
            upvoteCount: 1680
        },
        {
            fid: 5678,
            username: 'cdixon',
            displayName: 'Chris Dixon',
            bio: 'General Partner at a16z crypto. Building the future.',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chris',
            upvoteCount: 1420
        },
        {
            fid: 9012,
            username: 'naval',
            displayName: 'Naval Ravikant',
            bio: 'Founder of AngelList. Philosopher and investor.',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=naval',
            upvoteCount: 1890
        },
        {
            fid: 3456,
            username: 'punk6529',
            displayName: 'punk6529',
            bio: 'NFT collector and advocate. Building the open metaverse.',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=punk',
            upvoteCount: 980
        },
        {
            fid: 7890,
            username: 'sassal',
            displayName: 'Sassal.eth',
            bio: 'Ethereum researcher and educator. Daily Gwei host.',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sassal',
            upvoteCount: 650
        }
    ]

    for (const userData of sampleUsers) {
        await prisma.user.upsert({
            where: { username: userData.username },
            update: {},
            create: userData
        })
        console.log(`   ✅ User: @${userData.username}`)
    }

    // 5. Create Sample Projects
    console.log('📦 Creating sample projects...')

    // Get category IDs
    const saasCategory = await prisma.category.findUnique({ where: { slug: 'saas' } })
    const aiCategory = await prisma.category.findUnique({ where: { slug: 'ai-tools' } })
    const cryptoCategory = await prisma.category.findUnique({ where: { slug: 'crypto' } })
    const socialCategory = await prisma.category.findUnique({ where: { slug: 'social' } })
    const devtoolsCategory = await prisma.category.findUnique({ where: { slug: 'devtools' } })
    const web3Category = await prisma.category.findUnique({ where: { slug: 'web3' } })

    // Get user IDs
    const vitalik = await prisma.user.findUnique({ where: { username: 'vitalik' } })
    const dwr = await prisma.user.findUnique({ where: { username: 'dwr' } })
    const jesse = await prisma.user.findUnique({ where: { username: 'jessepollak' } })
    const horsefacts = await prisma.user.findUnique({ where: { username: 'horsefacts' } })
    const linda = await prisma.user.findUnique({ where: { username: 'linda' } })

    if (vitalik && dwr && jesse && horsefacts && linda &&
        saasCategory && aiCategory && cryptoCategory && socialCategory && devtoolsCategory && web3Category) {

        const sampleProjects = [
            {
                name: 'Warpcast',
                tagline: 'The best way to use Farcaster',
                description: 'Warpcast is a Farcaster client that makes it easy to connect with friends and discover new content on the decentralized social network.',
                websiteUrl: 'https://warpcast.com',
                logoImage: 'https://pbs.twimg.com/profile_images/1545121625791209473/Qk3LtAVl_400x400.jpg',
                coverImage: 'https://cdn.prod.website-files.com/65a47c51cd9e4fdda35e76f0/65a9f36db7f0ce8c4c0a3f82_warpcast-og.jpg',
                upvoteCount: 4250,
                featured: true,
                creatorId: dwr.id,
                categoryId: socialCategory.id
            },
            {
                name: 'Base',
                tagline: 'The secure, low-cost, builder-friendly Ethereum L2',
                description: 'Base is an Ethereum L2 incubated by Coinbase, built to bring the next billion users onchain with security, low costs, and easy developer experience.',
                websiteUrl: 'https://base.org',
                logoImage: 'https://pbs.twimg.com/profile_images/1720141771063173120/bslJRV6N_400x400.jpg',
                upvoteCount: 5800,
                featured: true,
                creatorId: jesse.id,
                categoryId: cryptoCategory.id
            },
            {
                name: 'Farcaster Frames',
                tagline: 'Interactive mini-apps in your feed',
                description: 'Build interactive experiences that run directly in Farcaster feeds. Create polls, games, NFT mints, and more.',
                websiteUrl: 'https://docs.farcaster.xyz/frames',
                logoImage: 'https://docs.farcaster.xyz/logo.png',
                upvoteCount: 3100,
                creatorId: dwr.id,
                categoryId: devtoolsCategory.id
            },
            {
                name: 'Paragraph',
                tagline: 'Web3 native newsletter platform',
                description: 'Create and monetize newsletters on the blockchain. Own your audience, get paid in crypto.',
                websiteUrl: 'https://paragraph.xyz',
                logoImage: 'https://pbs.twimg.com/profile_images/1567891279571529728/xEkiM4dO_400x400.jpg',
                upvoteCount: 1450,
                creatorId: linda.id,
                categoryId: saasCategory.id
            },
            {
                name: 'Zora',
                tagline: 'Create, collect, and trade NFTs',
                description: 'A marketplace and protocol for NFT creators and collectors. Mint, collect, and earn on your creative works.',
                websiteUrl: 'https://zora.co',
                logoImage: 'https://pbs.twimg.com/profile_images/1713259821752479744/lYdKQrJI_400x400.jpg',
                upvoteCount: 2340,
                creatorId: vitalik.id,
                categoryId: web3Category.id
            },
            {
                name: 'Neynar',
                tagline: 'Farcaster infrastructure and APIs',
                description: 'Build on Farcaster with powerful APIs and infrastructure. The easiest way to integrate Farcaster into your app.',
                websiteUrl: 'https://neynar.com',
                logoImage: 'https://pbs.twimg.com/profile_images/1654567858979061760/8dKwkEXb_400x400.png',
                upvoteCount: 1680,
                creatorId: horsefacts.id,
                categoryId: devtoolsCategory.id
            },
            {
                name: 'Supercast',
                tagline: 'Power user client for Farcaster',
                description: 'Advanced Farcaster client with powerful features for power users. Multi-account support, advanced search, and more.',
                websiteUrl: 'https://supercast.xyz',
                logoImage: 'https://pbs.twimg.com/profile_images/1689389277667573760/OCZsqjpH_400x400.jpg',
                upvoteCount: 892,
                creatorId: horsefacts.id,
                categoryId: socialCategory.id
            },
            {
                name: 'Coinbase Wallet',
                tagline: 'Your key to the world of crypto',
                description: 'The easiest and most secure crypto wallet. Explore DeFi, NFTs, and web3 applications.',
                websiteUrl: 'https://www.coinbase.com/wallet',
                logoImage: 'https://pbs.twimg.com/profile_images/1746222993974140928/1Q-N2hOQ_400x400.jpg',
                upvoteCount: 3420,
                featured: true,
                creatorId: jesse.id,
                categoryId: cryptoCategory.id
            }
        ]

        for (const project of sampleProjects) {
            await prisma.project.upsert({
                where: {
                    id: project.name.toLowerCase().replace(/\s+/g, '-')
                },
                update: {},
                create: {
                    ...project,
                    id: project.name.toLowerCase().replace(/\s+/g, '-')
                }
            })
            console.log(`   ✅ Project: ${project.name}`)
        }
    }

    console.log('\n✨ Seeding completed! (Categories + Users + Projects ready)')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
