"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";
import { useState } from "react";
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
} from "lucide-react";

// 🖼️ Image Upload Component - File upload aur URL se image add karne ke liye
const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // 📸 Image editor mein add karne ka function
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  // 📁 Local file upload ka handler
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

  // 🔗 URL se image add karne ka handler
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
          <button className="group relative h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105">
            <ImageIcon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            {/* Tooltip effect */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Image Add 
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-2 bg-white border border-gray-200 rounded-xl shadow-lg">
          <DropdownMenuItem 
            onClick={onUpload}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <div className="p-1 bg-blue-100 rounded-md">
              <UploadIcon className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Upload Images📁</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors"
          >
            <div className="p-1 bg-green-100 rounded-md">
              <SearchIcon className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">URL Paste  🔗</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Image URL Dialog - URL input ke liye modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="text-center pb-4 border-b border-gray-100">
            <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              Image URL Add 
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit();
                }
              }}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          <DialogFooter>
            <Button 
              onClick={handleImageUrlSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Insert Here ✨
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// 🔗 Link Button Component - Text mein link add karne ke liye
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  // Link apply karne ka function
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
        <button className="group relative h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 transform hover:scale-105">
          <Link2Icon className="h-4 w-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Link Add Here
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 w-80 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Input
            placeholder="https://www.example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
          <Button 
            onClick={() => onChange(value)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Apply 🚀
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🎨 Highlight Color Button - Text highlight karne ke liye
const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#ffeb3b";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105">
          <div className="relative">
            <HighlighterIcon className="h-4 w-4 text-gray-600 group-hover:text-yellow-600 transition-colors" />
            <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: value }}></div>
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Highlight 
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 text-center">Highlight Color चुनें</h4>
          <SketchPicker onChange={onChange} color={value} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 🎨 Text Color Button - Text ka color change karne ke liye
const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative h-8 w-8 flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-red-300 hover:bg-red-50 transition-all duration-200 transform hover:scale-105">
          <span className="text-sm font-bold text-gray-600 group-hover:text-red-600 transition-colors">A</span>
          <div className="h-0.5 w-4 rounded-full mt-0.5" style={{ backgroundColor: value }} />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Text Color
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 text-center">Text Color चुनें</h4>
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
              editor?.chain().focus().setHeading({ level: level as any }).run();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-indigo-50",
              currentLevel === level && "bg-indigo-100 text-indigo-700 font-medium"
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
    const currentFontObj = fonts.find(font => font.value === currentFont);
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
  colorClass = "blue"
}: ToolbarButtonProps) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "hover:border-blue-300 hover:bg-blue-50 group-hover:text-blue-600",
      green: "hover:border-green-300 hover:bg-green-50 group-hover:text-green-600",
      red: "hover:border-red-300 hover:bg-red-50 group-hover:text-red-600",
      purple: "hover:border-purple-300 hover:bg-purple-50 group-hover:text-purple-600",
      orange: "hover:border-orange-300 hover:bg-orange-50 group-hover:text-orange-600",
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
      <Icon className={cn(
        "h-4 w-4 text-gray-600 transition-colors",
        isActive && "text-blue-600"
      )} />
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

  // Spell check ki current state check karne ke liye
  const isSpellCheckActive = editor?.view.dom.getAttribute("spellcheck") === "true";

  // 📋 Toolbar sections - Different categories mein buttons organize kiye gaye hain
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    colorClass?: string;
  }[][] = [
    // History & Utility Section - Undo, Redo, Print, Spell Check
    [
      {
        label: "Undo करें",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false,
        colorClass: "blue",
      },
      {
        label: "Redo करें", 
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false,
        colorClass: "blue",
      },
      {
        label: "Print करें",
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
        isActive: isSpellCheckActive,
        colorClass: "purple",
      },
    ],
    // Text Formatting Section - Bold, Italic, Underline
    [
      {
        label: "Bold करें",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        colorClass: "red",
      },
      {
        label: "Italic करें",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        colorClass: "red",
      },
      {
        label: "Underline करें",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
        colorClass: "red",
      },
    ],
    // Content & List Section - Comments, Lists, Remove Formatting
    [
      {
        label: "Comment Add करें",
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
        label: "Formatting Remove करें",
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
      <Separator orientation="vertical" className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full" />

      {/* Font Controls */}
      <div className="flex items-center gap-2">
        <FontFamilyButton />
        <HeadingLevelButton />
      </div>

      <Separator orientation="vertical" className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full" />

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

      <Separator orientation="vertical" className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full" />

      {/* Media & Link Controls */}
      <div className="flex items-center gap-2">
        <LinkButton />
        <ImageButton />
      </div>

      <Separator orientation="vertical" className="h-8 bg-gradient-to-b from-gray-300 to-gray-400 w-px rounded-full" />

      {/* Content & List Controls */}
      <div className="flex items-center gap-2">
        {sections[2].map((item) => (
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
    </div>
  );
};