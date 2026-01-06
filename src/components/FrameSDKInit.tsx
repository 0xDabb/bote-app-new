'use client'

import { useEffect } from 'react'

export function FrameSDKInit() {
    useEffect(() => {
        const initSDK = async () => {
            try {
                console.log('[VoteBase] Starting SDK initialization...')

                // Dynamic import to avoid SSR issues
                const { sdk } = await import('@farcaster/miniapp-sdk')

                console.log('[VoteBase] SDK imported, calling ready()...')

                // Call ready immediately
                sdk.actions.ready()
                console.log('[VoteBase] SDK ready() called!')

                // Try to get context
                try {
                    const context = await sdk.context
                    console.log('[VoteBase] Context:', context)
                } catch (e) {
                    console.log('[VoteBase] Context error (non-critical):', e)
                }
            } catch (error) {
                console.error('[VoteBase] SDK init error:', error)

                // Fallback: try postMessage directly
                try {
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({ type: 'fc:ready' }, '*')
                        console.log('[VoteBase] Fallback: sent fc:ready via postMessage')
                    }
                } catch (e) {
                    console.error('[VoteBase] postMessage fallback failed:', e)
                }
            }
        }

        // Call immediately
        initSDK()

        // Also call after delays as backup
        const timer1 = setTimeout(initSDK, 200)
        const timer2 = setTimeout(initSDK, 1000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    return null
}
