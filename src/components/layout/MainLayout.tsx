import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <AuthProvider>
            {/* Full screen dark background */}
            <div className="min-h-screen flex justify-center" style={{ background: '#0a0a0a' }}>
                {/* Mobile container - centered */}
                <div
                    className="relative w-full min-h-screen"
                    style={{
                        maxWidth: '430px',
                        background: '#0F0F0F',
                        boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {children}
                </div>
            </div>
        </AuthProvider>
    )
}
