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

import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";
import AppMenu from "@/app/components/AppMenu/AppMenu";
import Searcher from "@/app/components/Searcher";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {Icon} from "@blueprintjs/core";

import "./css/navbar.css";
import ThemeToggle from "@/app/components/common/ThemeToggle";

export interface NavbarProps {
    title: string;
    logoUrl?: string | null;
    
    user: UserSettings;
    
    navigationItems: NavigationItem[];
    
    userNavigationItems: {
        name: string;
        href: string;
    }[];
    
    variant: "primary" | "light" | "dark";
}

export interface UserSettings {
    name: string;
    email: string;
    imageUrl: string;
}

export interface NavigationItem {
    icon: BlueprintIcons_16Id;
    name: string;
    href: string;
    current: boolean;
}

export default function Navbar(props: NavbarProps) {
    const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');
    
    let mainClasses = "navbar";
    
    switch(props.variant) {
        case "light":
            mainClasses += " navbar-light";
            break;
            
        case "dark":
            mainClasses += " navbar-dark";
            break;
    }
    
    return <>
        <Disclosure as="nav" className={mainClasses}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {props.logoUrl == null ? <></> : <img src={props.logoUrl} alt={props.title} className="h-8 w-8" />}                            
                            <h1 className="text-xl text-white font-black">{props.title}</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-5 flex items-baseline space-x-4 rounded-md px-3 py-2 text-sm font-medium">

                                <AppMenu />

                                {props.navigationItems.map((item) => (
                                    <a key={item.name} href={item.href} aria-current={item.current ? 'page' : undefined}
                                       className={classNames(item.current ? 'current' : '', 'nav-link' )}>
                                        <Icon icon={item.icon} /> {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">

                            <Searcher />
                            
                            <ThemeToggle />

                            {/*<button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">*/}
                            {/*    <span className="absolute -inset-1.5"/>*/}
                            {/*    <span className="sr-only">View notifications</span>*/}
                            {/*    <BellIcon aria-hidden="true" className="h-6 w-6"/>*/}
                            {/*</button>*/}

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="" src={props.user.imageUrl} className="h-8 w-8 rounded-full"/>
                                    </MenuButton>
                                </div>
                                <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                    {props.userNavigationItems.map((item) => (
                                        <MenuItem key={item.name}>
                                            <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">{item.name}</a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {props.navigationItems.map((item) => (
                        <DisclosureButton key={item.name} as="a" href={item.href} aria-current={item.current ? 'page' : undefined} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}>
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img alt="" src={props.user.imageUrl} className="h-10 w-10 rounded-full"/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{props.user.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{props.user.email}</div>
                        </div>
                        <button type="button" className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {props.userNavigationItems.map((item) => (
                            <DisclosureButton key={item.name} as="a" href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </>;
}