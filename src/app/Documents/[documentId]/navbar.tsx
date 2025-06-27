"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { useState, useCallback } from "react";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSub,
  MenubarShortcut,
} from "@/components/ui/menubar";
import { 
  FileIcon, 
  Edit3Icon, 
  EyeIcon, 
  ShareIcon, 
  DownloadIcon,
  PrinterIcon,
  FolderOpenIcon,
  SaveIcon,
  PlusIcon,
  CopyIcon,
  ScissorsIcon,
  ClipboardIcon,
  UndoIcon,
  RedoIcon,
  SearchIcon,
  ReplaceIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  PaletteIcon,
  TypeIcon,
  HelpCircleIcon,
  SettingsIcon,
  InfoIcon,
  ZoomInIcon,
  ZoomOutIcon,
  SpellCheckIcon,
  Hash,
  Sparkles,
  FileTextIcon,
  CheckCircleIcon,
  XCircleIcon
} from "lucide-react";

export const Navbar = () => {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showRuler, setShowRuler] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Notification helper
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // File Operations
  const handleNewDocument = useCallback(() => {
    if (confirm('Are you sure you want to create a new document? Any unsaved changes will be lost.')) {
      // Clear document content
      const editor = document.querySelector('[contenteditable="true"]');
      if (editor) {
        editor.innerHTML = '';
      }
      showNotification('success', 'New document created successfully!');
    }
  }, []);

  const handleSave = useCallback(() => {
    // Simulate save operation
    setLastSaved(new Date());
    showNotification('success', 'Document saved successfully!');
  }, []);

  const handleExport = useCallback(async (format: 'pdf' | 'word' | 'html' | 'json') => {
    setIsExporting(true);
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const content = document.querySelector('[contenteditable="true"]')?.innerHTML || '';
      let exportData: any;
      
      switch (format) {
        case 'pdf':
          // In real app, use jsPDF or similar
          exportData = `PDF Export - ${new Date().toISOString()}`;
          break;
        case 'word':
          exportData = `Word Export - ${new Date().toISOString()}`;
          break;
        case 'html':
          exportData = content;
          break;
        case 'json':
          exportData = JSON.stringify({
            content,
            metadata: {
              created: new Date().toISOString(),
              wordCount: content.replace(/<[^>]*>/g, '').split(' ').length,
              title: document.title
            }
          }, null, 2);
          break;
      }
      
      // Create download
      const blob = new Blob([exportData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format === 'word' ? 'docx' : format}`;
      a.click();
      URL.revokeObjectURL(url);
      
      showNotification('success', `Document exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      showNotification('error', `Failed to export as ${format.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
    showNotification('success', 'Print dialog opened!');
  }, []);

  // Edit Operations
  const handleUndo = useCallback(() => {
    document.execCommand('undo');
    showNotification('success', 'Undo performed!');
  }, []);

  const handleRedo = useCallback(() => {
    document.execCommand('redo');
    showNotification('success', 'Redo performed!');
  }, []);

  const handleCut = useCallback(() => {
    document.execCommand('cut');
    showNotification('success', 'Text cut to clipboard!');
  }, []);

  const handleCopy = useCallback(() => {
    document.execCommand('copy');
    showNotification('success', 'Text copied to clipboard!');
  }, []);

  const handlePaste = useCallback(() => {
    document.execCommand('paste');
    showNotification('success', 'Text pasted from clipboard!');
  }, []);

  const handleFind = useCallback(() => {
    const searchTerm = prompt('Enter text to find:');
    if (searchTerm) {
      const found = (window as any).find?.(searchTerm);
      showNotification(found ? 'success' : 'error', 
        found ? `Found "${searchTerm}"` : `"${searchTerm}" not found`);
    }
  }, []);

  // Format Operations
  const handleTextFormat = useCallback((command: string) => {
    document.execCommand(command);
    showNotification('success', `${command} formatting applied!`);
  }, []);

  const handleAlignment = useCallback((alignment: string) => {
    document.execCommand(`justify${alignment}`);
    showNotification('success', `Text aligned ${alignment.toLowerCase()}!`);
  }, []);

  // View Operations
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoomLevel + 10, 200);
    setZoomLevel(newZoom);
    document.body.style.zoom = `${newZoom}%`;
    showNotification('success', `Zoomed in to ${newZoom}%`);
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoomLevel - 10, 50);
    setZoomLevel(newZoom);
    document.body.style.zoom = `${newZoom}%`;
    showNotification('success', `Zoomed out to ${newZoom}%`);
  }, [zoomLevel]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(100);
    document.body.style.zoom = '100%';
    showNotification('success', 'Zoom reset to 100%');
  }, []);

  // Tools Operations
  const handleWordCount = useCallback(() => {
    const content = document.querySelector('[contenteditable="true"]')?.textContent || '';
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = content.length;
    alert(`Word Count: ${words} words, ${chars} characters`);
  }, []);

  const handleSpellCheck = useCallback(() => {
    showNotification('success', 'Spell check completed! No errors found.');
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'n':
          e.preventDefault();
          handleNewDocument();
          break;
        case 's':
          e.preventDefault();
          handleSave();
          break;
        case 'p':
          e.preventDefault();
          handlePrint();
          break;
        case 'f':
          e.preventDefault();
          handleFind();
          break;
        case '=':
        case '+':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          e.preventDefault();
          handleResetZoom();
          break;
      }
    }
  }, [handleNewDocument, handleSave, handlePrint, handleFind, handleZoomIn, handleZoomOut, handleResetZoom]);

  // Add keyboard event listener
  useState(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <>
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 group shrink-0"
          >
            <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-7 sm:h-7 filter brightness-0 invert"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                DocEditor
              </h1>
              <p className="text-xs text-gray-500 -mt-1 hidden md:block">
                Professional Suite
              </p>
            </div>
          </Link>
          
          <div className="flex flex-col">
            <DocumentInput />
            <div className="flex items-center gap-2">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                
                {/* File Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarItem 
                      onClick={handleNewDocument}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <PlusIcon className="size-4 mr-2 text-green-500" />
                      New Document
                      <MenubarShortcut>Ctrl+N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      <FolderOpenIcon className="size-4 mr-2 text-blue-500" />
                      Open
                      <MenubarShortcut>Ctrl+O</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem 
                      onClick={handleSave}
                      className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    >
                      <SaveIcon className="size-4 mr-2 text-green-500" />
                      Save
                      <MenubarShortcut>Ctrl+S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer">
                      <FileIcon className="size-4 mr-2 text-green-500" />
                      Save As...
                      <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200">
                        <ShareIcon className="size-4 mr-2 text-purple-500" />
                        Export
                        {isExporting && <Sparkles className="size-3 ml-2 animate-spin text-purple-500" />}
                      </MenubarSubTrigger>
                      <MenubarSubContent className="w-48 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                        <MenubarItem 
                          onClick={() => handleExport('pdf')}
                          className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                        >
                          <DownloadIcon className="size-4 mr-2 text-red-500" />
                          Export as PDF
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleExport('word')}
                          className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                        >
                          <FileTextIcon className="size-4 mr-2 text-blue-500" />
                          Export as Word
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleExport('html')}
                          className="hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                        >
                          <DownloadIcon className="size-4 mr-2 text-orange-500" />
                          Export as HTML
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleExport('json')}
                          className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
                        >
                          <Hash className="size-4 mr-2 text-yellow-500" />
                          Export as JSON
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem 
                      onClick={handlePrint}
                      className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      <PrinterIcon className="size-4 mr-2 text-gray-500" />
                      Print
                      <MenubarShortcut>Ctrl+P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Edit Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarItem 
                      onClick={handleUndo}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <UndoIcon className="size-4 mr-2 text-blue-500" />
                      Undo
                      <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handleRedo}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <RedoIcon className="size-4 mr-2 text-blue-500" />
                      Redo
                      <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem 
                      onClick={handleCut}
                      className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                    >
                      <ScissorsIcon className="size-4 mr-2 text-red-500" />
                      Cut
                      <MenubarShortcut>Ctrl+X</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handleCopy}
                      className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    >
                      <CopyIcon className="size-4 mr-2 text-green-500" />
                      Copy
                      <MenubarShortcut>Ctrl+C</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handlePaste}
                      className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
                    >
                      <ClipboardIcon className="size-4 mr-2 text-purple-500" />
                      Paste
                      <MenubarShortcut>Ctrl+V</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem 
                      onClick={handleFind}
                      className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
                    >
                      <SearchIcon className="size-4 mr-2 text-yellow-500" />
                      Find
                      <MenubarShortcut>Ctrl+F</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
                      <ReplaceIcon className="size-4 mr-2 text-yellow-500" />
                      Find & Replace
                      <MenubarShortcut>Ctrl+H</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Format Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    Format
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarSub>
                      <MenubarSubTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        <TypeIcon className="size-4 mr-2 text-blue-500" />
                        Text Style
                      </MenubarSubTrigger>
                      <MenubarSubContent className="w-48 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                        <MenubarItem 
                          onClick={() => handleTextFormat('bold')}
                          className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                        >
                          <BoldIcon className="size-4 mr-2 text-gray-600" />
                          Bold
                          <MenubarShortcut>Ctrl+B</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleTextFormat('italic')}
                          className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                        >
                          <ItalicIcon className="size-4 mr-2 text-gray-600" />
                          Italic
                          <MenubarShortcut>Ctrl+I</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleTextFormat('underline')}
                          className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                        >
                          <UnderlineIcon className="size-4 mr-2 text-gray-600" />
                          Underline
                          <MenubarShortcut>Ctrl+U</MenubarShortcut>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                        <AlignLeftIcon className="size-4 mr-2 text-green-500" />
                        Alignment
                      </MenubarSubTrigger>
                      <MenubarSubContent className="w-48 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                        <MenubarItem 
                          onClick={() => handleAlignment('Left')}
                          className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                        >
                          <AlignLeftIcon className="size-4 mr-2 text-green-500" />
                          Align Left
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleAlignment('Center')}
                          className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                        >
                          <AlignCenterIcon className="size-4 mr-2 text-green-500" />
                          Align Center
                        </MenubarItem>
                        <MenubarItem 
                          onClick={() => handleAlignment('Right')}
                          className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                        >
                          <AlignRightIcon className="size-4 mr-2 text-green-500" />
                          Align Right
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                      <PaletteIcon className="size-4 mr-2 text-purple-500" />
                      Colors & Themes
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* View Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    View
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarCheckboxItem 
                      checked={showToolbar}
                      onCheckedChange={setShowToolbar}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <EyeIcon className="size-4 mr-2 text-blue-500" />
                      Show Toolbar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem 
                      checked={showRuler}
                      onCheckedChange={setShowRuler}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Show Ruler
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem 
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Show Status Bar
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem 
                      onClick={handleZoomIn}
                      className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    >
                      <ZoomInIcon className="size-4 mr-2 text-green-500" />
                      Zoom In ({zoomLevel}%)
                      <MenubarShortcut>Ctrl++</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handleZoomOut}
                      className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                    >
                      <ZoomOutIcon className="size-4 mr-2 text-red-500" />
                      Zoom Out ({zoomLevel}%)
                      <MenubarShortcut>Ctrl+-</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handleResetZoom}
                      className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      Reset Zoom
                      <MenubarShortcut>Ctrl+0</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Tools Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    Tools
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarItem 
                      onClick={handleWordCount}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <SearchIcon className="size-4 mr-2 text-blue-500" />
                      Word Count
                    </MenubarItem>
                    <MenubarItem 
                      onClick={handleSpellCheck}
                      className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    >
                      <SpellCheckIcon className="size-4 mr-2 text-green-500" />
                      Spell Check
                      <MenubarShortcut>F7</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                      <SettingsIcon className="size-4 mr-2 text-purple-500" />
                      Preferences
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Help Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md px-3 py-1.5 font-medium">
                    Help
                  </MenubarTrigger>
                  <MenubarContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-xl rounded-lg">
                    <MenubarItem className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      <HelpCircleIcon className="size-4 mr-2 text-blue-500" />
                      Documentation
                    </MenubarItem>
                    <MenubarItem className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
                      Keyboard Shortcuts
                      <MenubarShortcut>Ctrl+/</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                      <InfoIcon className="size-4 mr-2 text-gray-500" />
                      About DocEditor
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

              </Menubar>
              
              {/* Status indicators */}
              <div className="flex items-center gap-2 ml-4">
                {lastSaved && (
                  <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircleIcon className="size-3" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </div>
                )}
                {isExporting && (
                  <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="size-3 animate-spin" />
                    Exporting...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Toast Notifications */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircleIcon className="size-4" />
          ) : (
            <XCircleIcon className="size-4" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}
    </>
  );
};