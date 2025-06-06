"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDictionary } from "@/hooks/useDictionary";
import { Menu } from "lucide-react";
import { getMainLinks } from "./nav";
import Link from "next/link";
import { useState } from "react";

export const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const dictionary = useDictionary();
  const { title } = dictionary;
  const links = getMainLinks(dictionary);
  return (
    <Drawer modal={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="md:hidden">
        <Button variant="outline" size={"icon"}>
          <span className="sr-only">options</span>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <ul className="grid justify-center gap-3 text-center">
            {links.map(({ path, title }) => (
              <li key={path}>
                <Link
                  href={`/${dictionary.lang}${path}`}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">{dictionary.cancel}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
