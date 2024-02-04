import React from 'react'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom'
import {logo} from '../assets/logo.png'

function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center w-full pt-4 pb-4'>
      <div><img src={logo} alt="" /></div>
      <div className='flex flex-row gap-8'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Adopt a Pet</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-80 p-4">
                <ul className='[&>li]:pt-2 [&>li]:pb-2'>
                  <li>
                    <NavigationMenuLink>Adopt a dog</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>Adopt a cat</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>Adopt other animals</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Know Your Pet</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-80 p-4">
                <ul className='[&>li]:pt-2 [&>li]:pb-2'>
                  <li>
                    <NavigationMenuLink>Pet chatbot</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>Pet Wellbeing</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>Other Stuff</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Rehome a pet
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>             
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div >
          <Button variant="secondary"><Link to='/login' >Login</Link></Button>
          &nbsp;
          <Button><Link to='/Signup' >Signup</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar