"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarSub,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { DocumentInput } from "./document-input";
import {
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  PrinterIcon,
  TrashIcon,
  UndoIcon,
  RedoIcon,
  CopyIcon,
  ScissorsIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  ImageIcon,
  LinkIcon,
  TableIcon,
} from "lucide-react";
import { MenubarItem } from "@radix-ui/react-menubar";
import { BsFilePdf } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-4 py-2">
      <div className="flex gap-3 items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="p-1 rounded-md bg-blue-50 border border-blue-200">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </Link>

        {/* Document Section */}
        <div className="flex flex-col gap-1">
          <DocumentInput />

          {/* Menu Section */}
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              {/* File Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors h-auto text-gray-700 hover:text-gray-900">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-56">
                  <MenubarSub>
                    <MenubarSubTrigger className="cursor-pointer flex items-center justify-between py-2 px-3">
                      <div className="flex items-center">
                        <FileIcon className="mr-3 size-4 text-gray-500" />
                        Save
                      </div>
                    </MenubarSubTrigger>
                    <MenubarSubContent className="min-w-40">
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <FileJsonIcon className="size-4 mr-3 text-orange-500" />
                        JSON
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <GlobeIcon className="size-4 mr-3 text-blue-500" />
                        HTML
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <BsFilePdf className="size-4 mr-3 text-red-500" />
                        PDF
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <FileTextIcon className="size-4 mr-3 text-gray-500" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSeparator />

                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <FilePlusIcon className="size-4 mr-3 text-green-500" />
                      New Document
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+N
                    </MenubarShortcut>
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <FilePenIcon className="size-4 mr-3 text-blue-500" />
                      Rename
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      F2
                    </MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem className="cursor-pointer hover:bg-gray-50 text-red-600 hover:text-red-700 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <TrashIcon className="size-4 mr-3" />
                      Remove
                    </div>
                    <MenubarShortcut className="text-xs text-red-400">
                      Del
                    </MenubarShortcut>
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem
                    onClick={() => window.print()}
                    className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3"
                  >
                    <div className="flex items-center">
                      <PrinterIcon className="size-4 mr-3 text-gray-500" />
                      Print
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Edit Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors h-auto text-gray-700 hover:text-gray-900">
                  Edit
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-56">
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <UndoIcon className="size-4 mr-3 text-gray-500" />
                      Undo
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <RedoIcon className="size-4 mr-3 text-gray-500" />
                      Redo
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+Y
                    </MenubarShortcut>
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <ScissorsIcon className="size-4 mr-3 text-gray-500" />
                      Cut
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+X
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <CopyIcon className="size-4 mr-3 text-gray-500" />
                      Copy
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+C
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <MdContentPaste className="size-4 mr-3 text-gray-500" />
                      Paste
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+V
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Insert Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors h-auto text-gray-700 hover:text-gray-900">
                  Insert
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-48">
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                    <ImageIcon className="size-4 mr-3 text-green-500" />
                    Image
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <LinkIcon className="size-4 mr-3 text-blue-500" />
                      Link
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+K
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                    <TableIcon className="size-4 mr-3 text-purple-500" />
                    Table
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Format Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors h-auto text-gray-700 hover:text-gray-900">
                  Format
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-56">
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <BoldIcon className="size-4 mr-3 text-gray-700" />
                      Bold
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+B
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <ItalicIcon className="size-4 mr-3 text-gray-700" />
                      Italic
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+I
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center justify-between py-2 px-3">
                    <div className="flex items-center">
                      <UnderlineIcon className="size-4 mr-3 text-gray-700" />
                      Underline
                    </div>
                    <MenubarShortcut className="text-xs text-gray-400">
                      Ctrl+U
                    </MenubarShortcut>
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarSub>
                    <MenubarSubTrigger className="cursor-pointer flex items-center justify-between py-2 px-3">
                      <div className="flex items-center">
                        <AlignLeftIcon className="mr-3 size-4 text-gray-500" />
                        Alignment
                      </div>
                    </MenubarSubTrigger>
                    <MenubarSubContent className="min-w-40">
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <AlignLeftIcon className="size-4 mr-3 text-gray-500" />
                        Left
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <AlignCenterIcon className="size-4 mr-3 text-gray-500" />
                        Center
                      </MenubarItem>
                      <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                        <AlignRightIcon className="size-4 mr-3 text-gray-500" />
                        Right
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem className="cursor-pointer hover:bg-gray-50 flex items-center py-2 px-3">
                    <ListIcon className="size-4 mr-3 text-gray-500" />
                    Bullet List
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      {/* Right side - can add user profile or other actions */}
      <div className="flex items-center gap-2">
        {/* Add any right-side content here */}
      </div>
    </nav>
  );
};
