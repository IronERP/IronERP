import {ReactElement} from "react";

import css from './PageHeader.module.css';
import {classList} from "@/lib/etc/utils";
import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import Badge from "@/app/components/common/Badge";

export interface PageHeaderProps {
    title: string;
    subtitle?: string | undefined;
    buttons?: ReactElement;
    breadcrumbItems?: BreadcrumbItem[];
    badge?: BadgeProps | undefined;
}

export interface BadgeProps {
    text: string;
    intent: "primary" | "secondary" | "default" | "warning" | "success" | "danger";
    shown: boolean;
}

export default function PageHeader(props: PageHeaderProps) {
    let classes: string[] = [ css.pageHeader ];    
    
    return <>
        <div className={css.pageHeaderWrapper}>
            {props.breadcrumbItems != undefined ? <><Breadcrumbs items={props.breadcrumbItems} /></>:<></>}
            <div className={classList(classes)}>
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {(props.badge != undefined && props.badge.shown)? <Badge intent={props.badge.intent} text={props.badge.text} /> : <></>}
                            {props.title}
                        </h2>
                        {props.subtitle != undefined ? <>
                            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                <div className={css.subtitle}>                                    
                                    {props.subtitle}
                                </div>
                            </div>
                        </> : <></>}
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        {props.buttons != undefined ? <>
                            {props.buttons}
                        </> : <></>}
                    </div>
                </div>
            </div>
        </div>
    </>;
}