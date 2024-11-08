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

import ThemeToggle from "@/app/components/common/ThemeToggle";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ThemeToggle> = {
    title: 'Controls/Theme Toggle',
    component: ThemeToggle,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Regular: Story = {
    args: {
        
    }
}