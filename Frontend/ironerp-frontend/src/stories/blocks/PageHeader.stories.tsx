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