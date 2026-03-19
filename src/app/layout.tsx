import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://comptoirbativoir.com'),
  title: 'Comptoir des Bâtisseurs Ivoiriens | Électricité Industrielle',
  description: 'Le COMPTOIR DES BATISSEURS IVOIRIENS met au service des professionnels son savoir-faire et sa forte expérience dans le domaine des installations électriques industrielles, bâtiment, groupe électrogène et froid climatisation.',
  keywords: 'électricité industrielle, groupe électrogène, froid climatisation, Abidjan, Côte d\'Ivoire, CBI',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    images: ['/images/og-image.jpg'],
    siteName: 'Comptoir des Bâtisseurs Ivoiriens',
    locale: 'fr_CI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cbi-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
