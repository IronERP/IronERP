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