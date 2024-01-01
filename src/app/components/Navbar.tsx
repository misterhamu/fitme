import React from 'react'
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import { ThemeSwitch } from './Theme-switch';


type Props = {}

export default function Navbar({}: Props) {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-2 mt-2 "
            href="/"
          >
            <Image src={"/fit-me-logo.png"} alt="" width={60} height={40}
            className='rounded-lg'
            ></Image>
            <p className='text-3xl font-semibold'>FitMe</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>


    </NextUINavbar>
  )
}