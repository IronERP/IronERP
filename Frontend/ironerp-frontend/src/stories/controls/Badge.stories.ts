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