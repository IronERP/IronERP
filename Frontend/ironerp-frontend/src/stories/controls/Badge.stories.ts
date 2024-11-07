import {Meta, StoryObj} from "@storybook/react";
import Badge from "@/app/components/common/Badge";

const meta: Meta<typeof Badge> = {
    title: 'Controls/Badge',
    component: Badge,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
    args: {
        text: "Badge",
        secondText: "with addon",
        icon: "info-sign",
        intent: "primary"
    }
};

export const Secondary: Story = {
    args: {
        text: "Badge",
        secondText: "with addon",
        icon: "minus",
        intent: "secondary"
    }
};

export const Success: Story = {
    args: {
        text: "Badge",
        secondText: "with addon",
        icon: "circle",
        intent: "success"
    }
};

export const Warning: Story = {
    args: {
        text: "Badge",
        secondText: "with addon",
        icon: "warning-sign",
        intent: "warning"
    }
};

export const Danger: Story = {
    args: {
        text: "Badge",
        secondText: "with addon",
        icon: "error",
        intent: "danger"
    }
};