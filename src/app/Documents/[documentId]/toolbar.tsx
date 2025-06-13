"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LucideIcon,
  Redo2Icon,
  Undo2Icon,
  BoldIcon,
  Printer,
  SpellCheckIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  Palette,
  Type,
  Sparkles,

} from "lucide-react";

const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const [currentLineHeight, setCurrentLineHeight] = useState("normal");
  
  // Force re-render when editor state changes
  useEffect(() => {
    if (!editor) return;
    
    const updateLineHeight = () => {
      const newLineHeight = getCurrentLineHeight();
      setCurrentLineHeight(newLineHeight);
    };
    
    // Listen to editor state changes
    editor.on('selectionUpdate', updateLineHeight);
    editor.on('transaction', updateLineHeight);
    
    // Initial update
    updateLineHeight();
    
    return () => {
      editor.off('selectionUpdate', updateLineHeight);
      editor.off('transaction', updateLineHeight);
    };
  }, [editor]);
  
  const lineHeights = [
    {
      label: "Default",
      value: "normal",
      icon: "⎯",
      description: "Default line height",
    },
    {
      label: "Single",
      value: "1",
      icon: "≡",
      description: "Single line height",
    },
    {
      label: "1.15",
      value: "1.15",
      icon: "☰",
      description: "1.15 line height",
    },
    {
      label: "1.5",
      value: "1.5",
      icon: "≣",
      description: "1.5 line height",
    },
    {
      label: "Double",
      value: "2",
      icon: "⋮",
      description: "Double line height",
    },
  ];

  // Get current line height from selected node
  const getCurrentLineHeight = useCallback(() => {
    if (!editor) return "normal";
    
    try {
      const { selection } = editor.state;
      const { $from } = selection;
      
      // Find the nearest node with lineHeight attribute
      for (let depth = $from.depth; depth >= 0; depth--) {
        const node = $from.node(depth);
        if (node.attrs && node.attrs.lineHeight) {
          return node.attrs.lineHeight;
        }
      }
      
      // Fallback: check if we can get attributes from editor
      const attrs = editor.getAttributes('paragraph') || editor.getAttributes('heading');
      return attrs.lineHeight || "normal";
    } catch (error) {
      return "normal";
    }
  }, [editor]);

  const getCurrentIcon = useCallback(() => {
    const current = lineHeights.find(({ value }) => value === currentLineHeight);
    return current?.icon || "⎯";
  }, [currentLineHeight]);

  const CurrentIcon = getCurrentIcon();

  const handleLineHeightChange = useCallback((value: string) => {
    if (!editor) return;
    
    try {
      if (value === "normal") {
        editor.chain().focus().unsetLineHeight().run();
      } else {
        editor.chain().focus().setLineHeight(value).run();
      }
      
      // Force immediate state update
      setTimeout(() => {
        const newLineHeight = getCurrentLineHeight();
        setCurrentLineHeight(newLineHeight);
      }, 50);
      
    } catch (error) {
      console.error("Error changing line height:", error);
    }
  }, [editor, getCurrentLineHeight]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-purple-300/60 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <span className="text-lg font-mono text-gray-600 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-110">{CurrentIcon}</span>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Line Height: {currentLineHeight}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-xl shadow-2xl min-w-[200px]">
        <div className="space-y-1">
          {lineHeights.map(({ label, value, icon, description }) => {
            const isActive = currentLineHeight === value;
            
            return (
              <button
                key={value}
                onClick={() => handleLineHeightChange(value)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 group/item",
                  isActive && "bg-gradient-to-r from-purple-100 to-purple-200 shadow-inner ring-1 ring-purple-300/50"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? "bg-gradient-to-br from-purple-200 to-purple-300 shadow-sm" 
                    : "bg-gradient-to-br from-gray-100 to-gray-200 group-hover/item:from-purple-100 group-hover/item:to-purple-200"
                )}>
                  <span className={cn(
                    "text-lg font-mono transition-all duration-300",
                    isActive 
                      ? "text-purple-700" 
                      : "text-gray-600 group-hover/item:text-purple-600"
                  )}>{icon}</span>
                </div>
                <div className="flex flex-col items-start flex-1">
                  <div className="flex items-center justify-between w-full">
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-purple-800" : "text-gray-800"
                    )}>
                      {label}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{description}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Debug info section */}
        <div className="mt-3 pt-3 border-t border-gray-200/60">
          <div className="text-xs text-gray-500 mb-2 px-1">Current State:</div>
          <div className="text-xs text-gray-400 px-1">
            Line Height: {currentLineHeight} | Active: {lineHeights.find(h => h.value === currentLineHeight)?.label || 'Unknown'}
          </div>
        </div>
        
        {/* Quick preview section */}
        <div className="mt-3 pt-3 border-t border-gray-200/60">
          <div className="text-xs text-gray-500 mb-2 px-1">Preview:</div>
          <div 
            className="px-3 py-2 bg-gray-50/50 rounded-lg text-sm text-gray-700 border border-gray-200/40"
            style={{ lineHeight: currentLineHeight }}
          >
            Sample text with {currentLineHeight} line height applied for better visualization.
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
// 🎨 Enhanced Font Size Button with better animations and feedback
const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFontSize(currentFontSize);
    setInputValue(currentFontSize);
  }, [currentFontSize]);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0 && size <= 96) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
    if (e.key === "Escape") {
      setInputValue(fontSize);
      setIsEditing(false);
    }
  };

  const increment = () => {
    const newSize = Math.min(parseInt(fontSize) + 2, 96);
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = Math.max(parseInt(fontSize) - 2, 8);
    updateFontSize(newSize.toString());
  };

  return (
    <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/60 overflow-hidden hover:shadow-xl hover:border-blue-300/60 transition-all duration-300 group">
      <button
        onClick={decrement}
        disabled={parseInt(fontSize) <= 8}
        className="group/btn h-9 w-9 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 disabled:from-gray-100 disabled:to-gray-200 disabled:cursor-not-allowed transition-all duration-300 border-r border-gray-200/60 hover:border-blue-200/60 hover:shadow-inner"
        title="Decrease font size"
      >
        <MinusIcon
          className={`size-4 transition-all duration-300 ${
            parseInt(fontSize) <= 8
              ? "text-gray-400"
              : "text-gray-600 group-hover/btn:text-blue-600 group-hover/btn:scale-110"
          }`}
        />
      </button>

      <div className="relative bg-gradient-to-b from-white to-gray-50">
        {isEditing ? (
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            min="8"
            max="96"
            autoFocus
            className="h-9 w-14 text-center text-sm font-semibold bg-gradient-to-b from-blue-50 to-blue-100 border-0 outline-none focus:from-blue-100 focus:to-blue-200 transition-all duration-300 text-blue-700"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setInputValue(currentFontSize);
            }}
            className="h-9 w-14 flex items-center justify-center text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gradient-to-b hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group/display"
            title="Click to edit font size"
          >
            <span className="relative flex flex-col items-center">
              <span className="text-sm font-bold group-hover/display:scale-110 transition-transform duration-200">
                {currentFontSize}
              </span>
              <span className="text-[8px] text-gray-400 font-normal -mt-0.5 group-hover/display:text-blue-400 transition-colors">
                px
              </span>
            </span>
          </button>
        )}
      </div>

      <button
        onClick={increment}
        disabled={parseInt(fontSize) >= 96}
        className="group/btn h-9 w-9 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 disabled:from-gray-100 disabled:to-gray-200 disabled:cursor-not-allowed transition-all duration-300 border-l border-gray-200/60 hover:border-blue-200/60 hover:shadow-inner"
        title="Increase font size"
      >
        <PlusIcon
          className={`size-4 transition-all duration-300 ${
            parseInt(fontSize) >= 96
              ? "text-gray-400"
              : "text-gray-600 group-hover/btn:text-blue-600 group-hover/btn:scale-110"
          }`}
        />
      </button>
    </div>
  );
};

// 📝 Enhanced List Button with better styling
const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icons: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      description: "Create bulleted list",
    },
    {
      label: "Ordered List",
      icons: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      description: "Create numbered list",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-yellow-300/60 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <ListIcon className="h-4 w-4 text-gray-600 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Lists
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-xl shadow-2xl min-w-[200px]">
        <div className="space-y-1">
          {lists.map(
            ({ label, icons: Icon, onClick, isActive, description }) => (
              <button
                key={label}
                onClick={onClick}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 group/item",
                  isActive() &&
                    "bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-inner"
                )}
              >
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200 group-hover/item:from-yellow-200 group-hover/item:to-yellow-300 transition-all duration-300">
                  <Icon className="size-4 text-yellow-700" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-800">
                    {label}
                  </span>
                  <span className="text-xs text-gray-500">{description}</span>
                </div>
              </button>
            )
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🎯 Enhanced Align Button
const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icons: AlignLeftIcon,
      description: "Left align text",
    },
    {
      label: "Align Center",
      value: "center",
      icons: AlignCenterIcon,
      description: "Center align text",
    },
    {
      label: "Align Right",
      value: "right",
      icons: AlignRightIcon,
      description: "Right align text",
    },
    {
      label: "Align Justify",
      value: "justify",
      icons: AlignJustifyIcon,
      description: "Justify text",
    },
  ];

  const getCurrentIcon = () => {
    const current = alignments.find(({ value }) =>
      editor?.isActive({ textAlign: value })
    );
    return current?.icons || AlignLeftIcon;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-purple-300/60 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <CurrentIcon className="h-4 w-4 text-gray-600 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-110" />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Text Align
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-xl shadow-2xl min-w-[200px]">
        <div className="space-y-1">
          {alignments.map(({ label, value, icons: Icon, description }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 group/item",
                editor?.isActive({ textAlign: value }) &&
                  "bg-gradient-to-r from-purple-100 to-purple-200 shadow-inner"
              )}
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 group-hover/item:from-purple-200 group-hover/item:to-purple-300 transition-all duration-300">
                <Icon className="size-4 text-purple-700" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800">
                  {label}
                </span>
                <span className="text-xs text-gray-500">{description}</span>
              </div>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🖼️ Enhanced Image Button with better UI
const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl.trim()) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-emerald-300/60 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            <ImageIcon className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-110" />
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
              Add Image 🖼️
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl">
          <div className="space-y-2">
            <DropdownMenuItem asChild>
              <button
                onClick={onUpload}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 cursor-pointer transition-all duration-300 group/item"
              >
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl group-hover/item:from-emerald-200 group-hover/item:to-emerald-300 transition-all duration-300">
                  <UploadIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-800">
                    Upload Image
                  </span>
                  <span className="text-xs text-gray-500">
                    From your device 📁
                  </span>
                </div>
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer transition-all duration-300 group/item"
              >
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover/item:from-blue-200 group-hover/item:to-blue-300 transition-all duration-300">
                  <SearchIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-800">
                    Image URL
                  </span>
                  <span className="text-xs text-gray-500">
                    Paste link here 🔗
                  </span>
                </div>
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="text-center pb-6 border-b border-gray-100">
            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
              Add Image URL
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit();
                }
              }}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 text-center"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleImageUrlSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Insert Image ✨
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// 🔗 Enhanced Link Button
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    if (href.trim()) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
      setValue("");
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-indigo-300/60 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <Link2Icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-all duration-300 group-hover:scale-110" />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Add Link 🔗
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 w-80 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg">
              <Link2Icon className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="font-semibold text-gray-800">Add Link</span>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="https://www.example.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300"
            />
            <Button
              onClick={() => onChange(value)}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🎨 Enhanced Color Buttons
const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#ffeb3b";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-yellow-300/60 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <div className="relative">
            <HighlighterIcon className="h-4 w-4 text-gray-600 group-hover:text-yellow-600 transition-all duration-300 group-hover:scale-110" />
            <div
              className="absolute -bottom-1 left-0 right-0 h-1 rounded-full shadow-sm"
              style={{ backgroundColor: value }}
            ></div>
          </div>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Highlight Color
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-yellow-600" />
            <h4 className="text-sm font-semibold text-gray-700">
              Choose Highlight Color
            </h4>
          </div>
          <SketchPicker onChange={onChange} color={value} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-9 w-9 flex flex-col items-center justify-center rounded-xl border border-gray-200/60 bg-white/90 shadow-lg hover:shadow-xl hover:border-red-300/60 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
          <Type className="h-4 w-4 text-gray-600 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110" />
          <div
            className="h-0.5 w-5 rounded-full mt-0.5 shadow-sm"
            style={{ backgroundColor: value }}
          />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
            Text Color
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-red-600" />
            <h4 className="text-sm font-semibold text-gray-700">
              Choose Text Color
            </h4>
          </div>
          <SketchPicker color={value} onChange={onChange} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 📝 Heading Level Button - H1, H2, H3 etc. ke liye
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const levels = [1, 2, 3, 4, 5, 6];
  const currentLevel = editor?.getAttributes("heading").level;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-8 w-28 flex items-center justify-between px-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105">
          <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 truncate transition-colors">
            {currentLevel ? `H${currentLevel}` : "Heading"}
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Heading Level
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 p-2 bg-white border border-gray-200 rounded-xl shadow-lg">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .setHeading({ level: level as any })
                .run();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-indigo-50",
              currentLevel === level &&
                "bg-indigo-100 text-indigo-700 font-medium"
            )}
          >
            <span className="text-sm font-medium">H{level}</span>
            <span className="text-xs text-gray-500">Heading {level}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 📝 Font Family Button - Different fonts choose karne ke liye
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const currentFont = editor?.getAttributes("textStyle").fontFamily;

  const fonts = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Impact", value: "Impact, sans-serif" },
    { label: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
    { label: "Helvetica", value: "Helvetica, sans-serif" },
  ];

  const getCurrentFontLabel = () => {
    const currentFontObj = fonts.find((font) => font.value === currentFont);
    return currentFontObj?.label || "Arial";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-8 w-32 flex items-center justify-between px-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 hover:bg-green-50 transition-all duration-200 transform hover:scale-105">
          <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 truncate transition-colors">
            {getCurrentFontLabel()}
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Font Family
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 max-h-64 overflow-y-auto p-2 bg-white border border-gray-200 rounded-xl shadow-lg">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-green-50",
              currentFont === value && "bg-green-100 text-green-700 font-medium"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🔧 Toolbar Button Interface
interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  label: string;
  colorClass?: string;
}

// 🎯 Individual Toolbar Button Component
const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
  label,
  colorClass = "blue",
}: ToolbarButtonProps) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "hover:border-blue-300 hover:bg-blue-50 group-hover:text-blue-600",
      green:
        "hover:border-green-300 hover:bg-green-50 group-hover:text-green-600",
      red: "hover:border-red-300 hover:bg-red-50 group-hover:text-red-600",
      purple:
        "hover:border-purple-300 hover:bg-purple-50 group-hover:text-purple-600",
      orange:
        "hover:border-orange-300 hover:bg-orange-50 group-hover:text-orange-600",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105",
        getColorClasses(colorClass),
        isActive && "bg-blue-100 border-blue-300 shadow-md scale-105"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 text-gray-600 transition-colors",
          isActive && "text-blue-600"
        )}
      />
      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {label}
      </div>
    </button>
  );
};

// 🎨 Main Toolbar Component
export const Toolbar = () => {
  const { editor } = useEditorStore();

  // 📋 Toolbar sections - Different categories mein buttons organize kiye gaye hain
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    colorClass?: string;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false,
        colorClass: "blue",
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        colorClass: "blue",
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
        isActive: false,
        colorClass: "green",
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },

        colorClass: "purple",
      },
    ],
    // Text Formatting Section - Bold, Italic, Underline
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        colorClass: "red",
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        colorClass: "red",
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
        colorClass: "red",
      },
    ],
    // Content & List Section - Comments, Lists, Remove Formatting
    [
      {
        label: "Comment Add",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Comment clicked"),
        isActive: false,
        colorClass: "green",
      },
      {
        label: "Todo List",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
        colorClass: "orange",
      },
      {
        label: "Formatting Remove",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: false,
        colorClass: "purple",
      },
    ],
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 min-h-[56px] rounded-2xl shadow-lg border border-gray-200 flex items-center gap-3 overflow-x-auto backdrop-blur-sm">
      {/* History & Utility Buttons */}
      <div className="flex items-center gap-2">
        {sections[0].map((item) => (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
            label={item.label}
            colorClass={item.colorClass}
          />
        ))}
      </div>

      {/* Elegant Separator */}
      <Separator
        orientation="vertical"
        className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full"
      />

      {/* Font Controls */}
      <div className="flex items-center gap-2">
        <FontFamilyButton />
        <HeadingLevelButton />
      </div>

      {/* Font Size */}
      <FontSizeButton />
      <Separator
        orientation="vertical"
        className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full"
      />

      {/* Text Formatting Buttons */}
      <div className="flex items-center gap-2">
        {sections[1].map((item) => (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
            label={item.label}
            colorClass={item.colorClass}
          />
        ))}
      </div>

      {/* Color Controls */}
      <div className="flex items-center gap-2">
        <TextColorButton />
        <HighlightColorButton />
      </div>

      <Separator
        orientation="vertical"
        className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full"
      />

      {/* Media & Link Controls */}
      <div className="flex items-center gap-2">
        <LinkButton />
        <ImageButton />
      </div>

      {/* Align & List Controls */}
      <AlignButton />
      <LineHeightButton />
      <ListButton />

      <Separator
        orientation="vertical"
        className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full"
      />

      {/* Content &

      {/* Content & List Controls */}
      <div className="flex items-center gap-2">
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};
