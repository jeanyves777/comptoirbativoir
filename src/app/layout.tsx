import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Comptoir des Bâtisseurs Ivoiriens | Électricité Industrielle',
  description: 'Le COMPTOIR DES BATISSEURS IVOIRIENS met au service des professionnels son savoir-faire et sa forte expérience dans le domaine des installations électriques industrielles, bâtiment, groupe électrogène et froid climatisation.',
  keywords: 'électricité industrielle, groupe électrogène, froid climatisation, Abidjan, Côte d\'Ivoire, CBI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cbi-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.setAttribute('data-theme', theme || 'dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
