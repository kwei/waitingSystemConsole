import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Provider from "@/app/Provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '線上後位系統-後台',
  description: '職涯發展中心-業師諮詢-線上後位系統',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body className={inter.className}>
              <Provider>
                  <Header />
                  <main className='flex-1 flex w-full items-center'>{children}</main>
                  <Footer />
              </Provider>
          </body>
      </html>
  )
}
