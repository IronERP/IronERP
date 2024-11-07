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