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

import {Meta, StoryObj} from "@storybook/react";
import Navbar from "@/app/components/common/Navbar";

const meta: Meta<typeof Navbar> = {
    title: 'Blocks/Navbar',
    component: Navbar,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
    args: {
        title: "Navbar",
        logoUrl: null,
        
        user: {
            name: "John Doe",
            email: "john@example.com",
            imageUrl: "//placehold.it/255"
        },
        
        navigationItems: [
            {
                icon: "home",
                name: "Home",
                href: "#",
                current: true
            },
            {
                icon: "cog",
                name: "Settings",
                href: "#",
                current: false
            }
        ],
        
        userNavigationItems: [
            {
                name: "Account",
                href: "#"
            }
        ],
        
        variant: "primary"
    }
}

export const Dark: Story = {
    args: {
        title: "Navbar",
        logoUrl: null,

        user: {
            name: "John Doe",
            email: "john@example.com",
            imageUrl: "//placehold.it/255"
        },

        navigationItems: [
            {
                icon: "home",
                name: "Home",
                href: "#",
                current: true
            },
            {
                icon: "cog",
                name: "Settings",
                href: "#",
                current: false
            }
        ],

        userNavigationItems: [
            {
                name: "Account",
                href: "#"
            }
        ],

        variant: "dark"
    }
}