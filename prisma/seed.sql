-- VoteBase Seed Data for Vercel Postgres
-- Run this in Vercel Postgres Query Editor

-- Clear existing data
TRUNCATE TABLE "Notification", "SavedProject", "Comment", "Upvote", "Project", "Category", "User" CASCADE;

-- Insert Categories
INSERT INTO "Category" (id, name, slug, icon, color, "order") VALUES
('cat1', 'SaaS', 'saas', '💼', '#3b82f6', 1),
('cat2', 'AI Tools', 'ai-tools', '🤖', '#8b5cf6', 2),
('cat3', 'Productivity', 'productivity', '⚡', '#10b981', 3),
('cat4', 'Crypto', 'crypto', '₿', '#f59e0b', 4),
('cat5', 'Mobile', 'mobile', '📱', '#ec4899', 5),
('cat6', 'Design', 'design', '🎨', '#06b6d4', 6),
('cat7', 'DevTools', 'devtools', '🛠️', '#6366f1', 7),
('cat8', 'Fintech', 'fintech', '💰', '#14b8a6', 8),
('cat9', 'Social', 'social', '👥', '#f43f5e', 9),
('cat10', 'Games', 'games', '🎮', '#a855f7', 10),
('cat11', 'Web3', 'web3', '🌐', '#0ea5e9', 11),
('cat12', 'E-commerce', 'ecommerce', '🛒', '#84cc16', 12);

-- Insert Users
INSERT INTO "User" (id, fid, username, "displayName", "avatarUrl") VALUES
('user1', 5650, 'vitalik', 'Vitalik Buterin', 'https://i.imgur.com/gF8Bges.png'),
('user2', 3, 'dwr', 'Dan Romero', 'https://i.imgur.com/J3kLLxI.png'),
('user3', 6806, 'horsefacts', 'horsefacts.eth', 'https://i.imgur.com/7myBO3M.png'),
('user4', 4823, 'linda', 'Linda Xie', 'https://i.imgur.com/qZVjWvm.png'),
('user5', 2, 'jessepollak', 'Jesse Pollak', 'https://i.imgur.com/N8kR7Wr.png');

-- Insert Projects
INSERT INTO "Project" (id, name, tagline, description, "websiteUrl", "logoImage", "coverImage", featured, "upvoteCount", "creatorId", "categoryId") VALUES
('proj1', 'Warpcast', 'The best way to use Farcaster', 'Warpcast is a Farcaster client that makes it easy to connect with friends and discover new content.', 'https://warpcast.com', 'https://i.imgur.com/warpcast.png', 'https://i.imgur.com/warpcast-cover.png', false, 4250, 'user2', 'cat9'),
('proj2', 'Farcaster Frames', 'Interactive mini-apps in your feed', 'Build interactive experiences that run directly in Farcaster feeds.', 'https://docs.farcaster.xyz/frames', 'https://i.imgur.com/frames.png', NULL, false, 3100, 'user2', 'cat7'),
('proj3', 'Base', 'A new Ethereum L2, incubated by Coinbase', 'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.', 'https://base.org', 'https://i.imgur.com/base.png', 'https://i.imgur.com/base-cover.png', true, 5800, 'user5', 'cat4'),
('proj4', 'Supercast', 'Power user client for Farcaster', 'Advanced Farcaster client with powerful features for power users.', 'https://supercast.xyz', 'https://i.imgur.com/supercast.png', NULL, false, 892, 'user3', 'cat9'),
('proj5', 'Paragraph', 'Web3 native newsletter platform', 'Create and monetize newsletters on the blockchain.', 'https://paragraph.xyz', 'https://i.imgur.com/paragraph.png', NULL, false, 1450, 'user4', 'cat1'),
('proj6', 'Zora', 'Create, collect, and trade NFTs', 'A marketplace and protocol for NFT creators and collectors.', 'https://zora.co', 'https://i.imgur.com/zora.png', NULL, false, 2340, 'user1', 'cat11'),
('proj7', 'Neynar', 'Farcaster infrastructure and APIs', 'Build on Farcaster with powerful APIs and infrastructure.', 'https://neynar.com', 'https://i.imgur.com/neynar.png', NULL, false, 1680, 'user2', 'cat7'),
('proj8', 'Farcaster AI Assistant', 'AI-powered Farcaster companion', 'Get AI help for crafting better casts and discovering content.', NULL, 'https://i.imgur.com/ai.png', NULL, false, 756, 'user3', 'cat2'),
('proj9', 'CoinTracker', 'Crypto portfolio tracker', 'Track your crypto portfolio and taxes automatically.', 'https://cointracker.io', 'https://i.imgur.com/cointracker.png', NULL, false, 980, 'user4', 'cat8'),
('proj10', 'Frame Studio', 'No-code frame builder', 'Build Farcaster frames without writing code.', 'https://framestudio.xyz', 'https://i.imgur.com/framestudio.png', NULL, false, 524, 'user5', 'cat7'),
('proj11', 'Drakula', 'Short-form video on Farcaster', 'TikTok-style short videos for the Farcaster community.', 'https://drakula.app', 'https://i.imgur.com/drakula.png', NULL, false, 1120, 'user1', 'cat9'),
('proj12', 'Farcaster Mobile SDK', 'Build mobile Farcaster apps', 'SDK for building native mobile Farcaster applications.', 'https://github.com/farcaster/mobile-sdk', 'https://i.imgur.com/sdk.png', NULL, false, 445, 'user2', 'cat7');

SELECT 'Seed completed successfully!' as status;
