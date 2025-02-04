import './ui/global.css'
import { Footer } from './ui/footer';
import SessionAuthProvider from '@/context/SessionAuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
        {children}
        
        </SessionAuthProvider>
      </body>
    </html>
  );
}
