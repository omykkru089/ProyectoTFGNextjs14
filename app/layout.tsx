import './ui/global.css'
import { Footer } from './ui/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
