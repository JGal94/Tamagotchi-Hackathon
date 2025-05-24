import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Tamagotchi NFT',
  description: 'Cría y cuida tu Tamagotchi NFT en Starknet'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 min-h-screen">
        <ThemeProvider enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}