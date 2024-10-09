import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from './ui/navigation-menu';
import Logout from './logout';

export default function profileDestNav() {
    return (
        <div className="flex flex-row w-full h-[80px]">
            <NavigationMenu className="w-full flex flex-row items-center bg-black">
                <NavigationMenuList className="flex flex-row items-center">
                    <NavigationMenuItem className="hover:bg-black">
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-black">
                        <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>
                                <Logout />
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
