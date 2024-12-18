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