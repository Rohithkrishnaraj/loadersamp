import NextTransitionBar from

'next-transition-bar';
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextTransitionBar />
        {children}
      </body>
    </html>
  );
}