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