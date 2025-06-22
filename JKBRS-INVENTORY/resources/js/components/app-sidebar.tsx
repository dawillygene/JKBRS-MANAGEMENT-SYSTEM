import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

import {
    LayoutGrid,
    Factory,
    Building2,
    Package,
    LineChart,
    BarChart2,
    Users,
    UserCheck,
    Settings,
    Globe,
    LifeBuoy,

} from 'lucide-react';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Factory Management',
        href: '/factory',
        icon: Factory,
    },
    {
        title: 'Main Office',
        href: '/office',
        icon: Building2,
    },
    {
        title: 'Inventory',
        href: '/inventory',
        icon: Package,
    },
    {
        title: 'Sales and Purchases',
        href: '/sales',
        icon: LineChart,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart2,
    },
    {
        title: 'User Management',
        href: '/user-management',
        icon: Users, 
    },
    {
        title: 'Employee Management',
        href: '/employees',
        icon: UserCheck, 
    },
    {
        title: 'App Settings',
        href: '/app-settings',
        icon: Settings, 
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Website',
        href: 'https://jkbrs.co.tz/',
        icon: Globe,
    },
    {
        title: 'Technical Support',
        href: 'https://dawillygene.com/',
        icon: LifeBuoy,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                            <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
