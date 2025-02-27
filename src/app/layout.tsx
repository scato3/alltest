import type { Metadata } from 'next';
import QueryProvider from './provider/query-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <div>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
