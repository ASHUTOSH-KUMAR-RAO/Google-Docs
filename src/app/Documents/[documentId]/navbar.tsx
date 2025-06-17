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
  ShareIcon,
  SettingsIcon,
  UserIcon,
  SearchIcon,
  StarIcon,
  ClockIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { MenubarItem } from "@radix-ui/react-menubar";
import { BsFilePdf } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";
import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";

export const Navbar = () => {
  const { editor } = useEditorStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // File Operations
  const handleSaveAsJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAsHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAsPDF = () => {
    window.print();
  };

  const handleSaveAsText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewDocument = () => {
    if (!editor) return;
    if (confirm('Are you sure you want to create a new document? Unsaved changes will be lost.')) {
      editor.chain().focus().clearContent().run();
    }
  };

  const handleRename = () => {
    const newName = prompt('Enter new document name:');
    if (newName) {
      console.log('Document renamed to:', newName);
    }
  };

  const handleRemove = () => {
    if (!editor) return;
    if (confirm('Are you sure you want to remove this document? This action cannot be undone.')) {
      editor.chain().focus().clearContent().run();
    }
  };

  // Edit Operations
  const handleUndo = () => {
    if (!editor) return;
    if (editor.can().undo()) {
      editor.chain().focus().undo().run();
    }
  };

  const handleRedo = () => {
    if (!editor) return;
    if (editor.can().redo()) {
      editor.chain().focus().redo().run();
    }
  };

  const handleCut = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    navigator.clipboard.writeText(text);
    editor.chain().focus().deleteSelection().run();
  };

  const handleCopy = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    navigator.clipboard.writeText(text);
  };

  const handlePaste = async () => {
    if (!editor) return;
    try {
      const text = await navigator.clipboard.readText();
      editor.chain().focus().insertContent(text).run();
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  // Insert Operations
  const handleInsertImage = () => {
    if (!editor) return;
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleInsertLink = () => {
    if (!editor) return;
    const url = prompt('Enter link URL:');
    if (url) {
      const text = prompt('Enter link text (optional):') || url;
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    }
  };

  const handleInsertTable = () => {
    if (!editor) return;
    const rows = parseInt(prompt('Enter number of rows:') || '3');
    const cols = parseInt(prompt('Enter number of columns:') || '3');
    if (rows > 0 && cols > 0) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200/80 shadow-lg backdrop-blur-md px-6 py-3 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      
      <div className="flex gap-4 items-center relative z-10">
        {/* Enhanced Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              className="w-7 h-7 filter brightness-0 invert"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              DocEditor
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Professional Suite</p>
          </div>
        </Link>

        {/* Enhanced Document Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <DocumentInput />
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 hidden sm:inline">Saved</span>
            </div>
          </div>

          {/* Enhanced Menu Section */}
          <div className="flex items-center">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              {/* File Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 h-auto text-gray-700 hover:text-blue-700 border border-transparent hover:border-blue-200/50 hover:shadow-md">
                  <FileIcon className="w-4 h-4 mr-2" />
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-64 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-xl">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Save Options</div>
                    <MenubarSub>
                      <MenubarSubTrigger className="cursor-pointer flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                            <FileIcon className="size-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Save As</div>
                            <div className="text-xs text-gray-500">Export document</div>
                          </div>
                        </div>
                      </MenubarSubTrigger>
                      <MenubarSubContent className="min-w-48 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl">
                        <div className="p-1">
                          <MenubarItem 
                            onClick={handleSaveAsJSON}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mr-3">
                              <FileJsonIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">JSON</span>
                          </MenubarItem>
                          <MenubarItem 
                            onClick={handleSaveAsHTML}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mr-3">
                              <GlobeIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">HTML</span>
                          </MenubarItem>
                          <MenubarItem 
                            onClick={handleSaveAsPDF}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center mr-3">
                              <BsFilePdf className="size-3 text-white" />
                            </div>
                            <span className="font-medium">PDF</span>
                          </MenubarItem>
                          <MenubarItem 
                            onClick={handleSaveAsText}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center mr-3">
                              <FileTextIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">Text</span>
                          </MenubarItem>
                        </div>
                      </MenubarSubContent>
                    </MenubarSub>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />

                    <MenubarItem 
                      onClick={handleNewDocument}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                          <FilePlusIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">New Document</div>
                          <div className="text-xs text-gray-500">Create fresh document</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+N
                      </MenubarShortcut>
                    </MenubarItem>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />

                    <MenubarItem 
                      onClick={handleRename}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                          <FilePenIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Rename</div>
                          <div className="text-xs text-gray-500">Change document name</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        F2
                      </MenubarShortcut>
                    </MenubarItem>

                    <MenubarItem 
                      onClick={handleRemove}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 text-red-600 hover:text-red-700 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mr-3">
                          <TrashIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Remove</div>
                          <div className="text-xs text-red-400">Delete document</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-red-400 bg-red-100 px-2 py-1 rounded">
                        Del
                      </MenubarShortcut>
                    </MenubarItem>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />

                    <MenubarItem
                      onClick={() => window.print()}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center mr-3">
                          <PrinterIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Print</div>
                          <div className="text-xs text-gray-500">Print document</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+P
                      </MenubarShortcut>
                    </MenubarItem>
                  </div>
                </MenubarContent>
              </MenubarMenu>

              {/* Edit Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 h-auto text-gray-700 hover:text-green-700 border border-transparent hover:border-green-200/50 hover:shadow-md">
                  <ScissorsIcon className="w-4 h-4 mr-2" />
                  Edit
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-64 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-xl">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">History</div>
                    <MenubarItem 
                      onClick={handleUndo}
                      disabled={!editor || !editor.can().undo()}
                      className={`cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 ${
                        !editor || !editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                          <UndoIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Undo</div>
                          <div className="text-xs text-gray-500">Revert last action</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+Z
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={handleRedo}
                      disabled={!editor || !editor.can().redo()}
                      className={`cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 ${
                        !editor || !editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                          <RedoIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Redo</div>
                          <div className="text-xs text-gray-500">Restore action</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+Y
                      </MenubarShortcut>
                    </MenubarItem>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Clipboard</div>

                    <MenubarItem 
                      onClick={handleCut}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mr-3">
                          <ScissorsIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Cut</div>
                          <div className="text-xs text-gray-500">Cut to clipboard</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+X
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={handleCopy}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                          <CopyIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Copy</div>
                          <div className="text-xs text-gray-500">Copy to clipboard</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+C
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={handlePaste}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mr-3">
                          <MdContentPaste className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Paste</div>
                          <div className="text-xs text-gray-500">Paste from clipboard</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+V
                      </MenubarShortcut>
                    </MenubarItem>
                  </div>
                </MenubarContent>
              </MenubarMenu>

              {/* Insert Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 h-auto text-gray-700 hover:text-purple-700 border border-transparent hover:border-purple-200/50 hover:shadow-md">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Insert
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-56 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-xl">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Media & Elements</div>
                    <MenubarItem 
                      onClick={handleInsertImage}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                        <ImageIcon className="size-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Image</div>
                        <div className="text-xs text-gray-500">Add image from URL</div>
                      </div>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={handleInsertLink}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                          <LinkIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Link</div>
                          <div className="text-xs text-gray-500">Insert hyperlink</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+K
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={handleInsertTable}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                        <TableIcon className="size-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Table</div>
                        <div className="text-xs text-gray-500">Insert data table</div>
                      </div>
                    </MenubarItem>
                  </div>
                </MenubarContent>
              </MenubarMenu>

              {/* Format Menu */}
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 h-auto text-gray-700 hover:text-orange-700 border border-transparent hover:border-orange-200/50 hover:shadow-md">
                  <BoldIcon className="w-4 h-4 mr-2" />
                  Format
                </MenubarTrigger>
                <MenubarContent className="print:hidden min-w-64 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-xl">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Text Style</div>
                    <MenubarItem 
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-slate-800 flex items-center justify-center mr-3">
                          <BoldIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">Bold</div>
                          <div className="text-xs text-gray-500">Make text bold</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+B
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-slate-800 flex items-center justify-center mr-3">
                          <ItalicIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium italic text-gray-800">Italic</div>
                          <div className="text-xs text-gray-500">Make text italic</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+I
                      </MenubarShortcut>
                    </MenubarItem>
                    
                    <MenubarItem 
                      onClick={() => editor?.chain().focus().toggleUnderline().run()}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-slate-800 flex items-center justify-center mr-3">
                          <UnderlineIcon className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium underline text-gray-800">Underline</div>
                          <div className="text-xs text-gray-500">Underline text</div>
                        </div>
                      </div>
                      <MenubarShortcut className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Ctrl+U
                      </MenubarShortcut>
                    </MenubarItem>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Layout</div>

                    <MenubarSub>
                      <MenubarSubTrigger className="cursor-pointer flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                            <AlignLeftIcon className="size-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Alignment</div>
                            <div className="text-xs text-gray-500">Text alignment</div>
                          </div>
                        </div>
                      </MenubarSubTrigger>
                      <MenubarSubContent className="min-w-48 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl">
                        <div className="p-1">
                          <MenubarItem 
                            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center mr-3">
                              <AlignLeftIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">Left</span>
                          </MenubarItem>
                          <MenubarItem 
                            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center mr-3">
                              <AlignCenterIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">Center</span>
                          </MenubarItem>
                          <MenubarItem 
                            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center mr-3">
                              <AlignRightIcon className="size-3 text-white" />
                            </div>
                            <span className="font-medium">Right</span>
                          </MenubarItem>
                        </div>
                      </MenubarSubContent>
                    </MenubarSub>

                    <MenubarItem 
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center py-3 px-3 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                        <ListIcon className="size-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Bullet List</div>
                        <div className="text-xs text-gray-500">Create bullet points</div>
                      </div>
                    </MenubarItem>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      {/* Enhanced Right Section */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200 border border-transparent hover:border-gray-200/50 hover:shadow-md"
        >
          <SearchIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Quick Actions */}
        <div className="flex items-center gap-1 bg-gray-50/80 rounded-lg p-1 border border-gray-200/50">
          <button
            onClick={handleUndo}
            disabled={!editor || !editor.can().undo()}
            className={`p-2 rounded-md transition-all duration-200 ${
              !editor || !editor.can().undo() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <UndoIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={!editor || !editor.can().redo()}
            className={`p-2 rounded-md transition-all duration-200 ${
              !editor || !editor.can().redo() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <RedoIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Share Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
          <ShareIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
          <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <MoreHorizontalIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-xl z-50">
          <div className="flex items-center gap-3 px-6 py-4">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in document..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Recently Saved Indicator */}
      <div className="absolute top-2 right-2 opacity-0 animate-pulse">
        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Auto-saved
        </div>
      </div>
    </nav>
  );
};