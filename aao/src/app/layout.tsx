'use client'

import PrimarySearchAppBar from '@/components/Navigation/NavBar';
import Footer from '@/components/Navigation/Footer';


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <PrimarySearchAppBar />
            <div style={{margin: "20px 0"}}>
              <main>{children}</main>
            </div>
            <Footer />
        </body>
      </html>
    )
}