import Button from "@/app/components/common/Button";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Button> = {
    title: "Controls/Button",
    component: Button,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        label: "Primary Button",
        intent: "primary",
        icon: "plus"
    }
}

export const Default: Story = {
    args: {
        label: "Default Button",
        intent: "default",
        icon: "circle"
    }
}

export const Secondary: Story = {
    args: {
        label: "Secondary Button",
        intent: "secondary",
        icon: "minus"
    }
}

export const Success: Story = {
    args: {
        label: "Success Button",
        intent: "success",
        icon: "spell-check"
    }
}

export const Warning: Story = {
    args: {
        label: "Warning Button",
        intent: "warning",
        icon: "warning-sign"
    }
}

export const Danger: Story = {
    args: {
        label: "Danger Button",
        intent: "danger",
        icon: "error"
    }
}