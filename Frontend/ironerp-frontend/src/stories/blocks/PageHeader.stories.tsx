import PageHeader from "@/app/components/common/PageHeader";
import Button from "@/app/components/common/Button";
import {Meta, StoryObj} from "@storybook/react";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const meta: Meta<typeof PageHeader> = {
    title: 'Blocks/Page Header',
    component: PageHeader,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
    args: {
        title: "Page Header",
        subtitle: "Page Header Subtitle",
        buttons: <>
            <Button label="Refresh" intent="default" icon="refresh" />
            <Button label="Add New" intent="primary" icon="plus" />
        </>,
        breadcrumbItems: [
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
        ],
        badge: {
            text: "Unsaved Changes",
            intent: "warning",
            shown: true
        }
    }
}