import localFont from 'next/font/local'

export const fraunces = localFont({
  src: [
    {
      path: '../styles/fonts/fraunces-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Times New Roman', 'serif'],
})

export const inter = localFont({
  src: [
    {
      path: '../styles/fonts/inter-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
})
