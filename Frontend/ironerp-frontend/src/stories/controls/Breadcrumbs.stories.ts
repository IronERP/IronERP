import Breadcrumbs from "@/app/components/Breadcrumbs";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Breadcrumbs> = {
    title: "Controls/Breadcrumbs",
    component: Breadcrumbs,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Breadcrumb: Story = {
    args: {
        items: [
            {
                name: "Home",
                href: "",
                bpicon: "home",
                current: false
            },
            {
                name: "Components",
                href: "",
                bpicon: "widget",
                current: false
            },
            {
                name: "Breadcrumbs",
                href: "",
                current: true
            }
        ]
    }
}