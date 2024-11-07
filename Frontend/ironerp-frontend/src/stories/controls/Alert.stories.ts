import Alert from "@/app/components/common/Alert";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Alert> = {
    title: "Controls/Alert",
    component: Alert,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
    args: {
        title: "Hello There",
        content: "This is a primary alert",
        intent: "primary",
        icon: "info-sign",
        dismissable: true
    }
}

export const Secondary: Story = {
    args: {
        title: "Hello There",
        content: "This is a secondary alert",
        intent: "secondary",
        icon: "info-sign",
        dismissable: true
    }
}

export const Success: Story = {
    args: {
        title: "Hello There",
        content: "This is a success alert",
        intent: "success",
        icon: "spell-check",
        dismissable: true
    }
}

export const Warning: Story = {
    args: {
        title: "Hello There",
        content: "This is a warning alert",
        intent: "warning",
        icon: "warning-sign",
        dismissable: true
    }
}

export const Danger: Story = {
    args: {
        title: "Hello There",
        content: "This is a danger alert",
        intent: "danger",
        icon: "error",
        dismissable: true
    }
}