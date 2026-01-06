'use client'

import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export function FrameSDKInit() {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        // Only run once
        if (isReady) return

        const init = async () => {
            console.log('[VoteBase] FrameSDKInit: Starting...')

            try {
                // Call ready
                await sdk.actions.ready()
                console.log('[VoteBase] ✅ sdk.actions.ready() called successfully!')
                setIsReady(true)
            } catch (error) {
                console.error('[VoteBase] ❌ SDK ready error:', error)
            }
        }

        // Run immediately
        init()
    }, [isReady])

    return null
}
