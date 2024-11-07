"use client";

/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

import localFont from "next/font/local";
import "./globals.css";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PrelineScript from "@/app/components/PrelineScript";
import {usePathname} from "next/navigation";
import {AdjustmentsHorizontalIcon, CircleStackIcon, HomeIcon} from "@heroicons/react/16/solid";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import Searcher from "@/app/components/Searcher";
import {Squares2X2Icon} from "@heroicons/react/24/outline";
import AppMenu from "@/app/components/AppMenu/AppMenu";
import Navbar, {NavigationItem} from "@/app/components/common/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  
  const currentPath = usePathname();

  const navigation: NavigationItem[] = [
    { icon: "home", name: 'Home', href: '/', current: (currentPath == "/") },
    { icon: "code", name: 'Models', href: '/entities', current: (currentPath.startsWith("/entities")) },
    { icon: "cog", name: 'Settings', href: '/settings', current: (currentPath.startsWith("/settings")) },
  ]

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-slate-600`}>
        <div className="min-h-full">
          <Navbar title="IronERP" user={user} navigationItems={navigation} userNavigationItems={userNavigation} variant="light" />
          {children}
          <div className="text-center text-slate-800 dark:text-slate-200">IronERP v1.0.0</div>
        </div>
        <PrelineScript />
      </body>
    </html>
  );
}
