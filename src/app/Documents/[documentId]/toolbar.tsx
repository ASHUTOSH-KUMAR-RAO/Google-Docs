"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
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
} from "lucide-react";

const HeadingLevelButton = ()=>{
  const editorStore = useEditorStore();
  const editor = editorStore.editor;
  const levels = [1, 2, 3, 4, 5, 6];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[120px] justify-between flex items-center px-1.5 overflow-hidden shrink-0 rounded-sm hover:bg-neutral-200/80">
          <span className="truncate">
            {editor?.getAttributes("heading").level || "Heading"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {levels.map((level) => (
          <button
            onClick={() => {
              editor?.chain().focus().setHeading({ level: level as any }).run();
            }}
            key={level}
            className={cn(
              "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-400/80",
              editor?.getAttributes("heading").level === level &&
                "bg-neutral-400/80"
            )}
          >
            <span className="text-sm">Heading {level}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const FontFamilyButton = () => {
  const editorStore = useEditorStore();
  const editor = editorStore.editor;
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
    { label: "Palatino", value: "'Palatino Linotype', serif" },
    { label: "Lucida Console", value: "'Lucida Console', monospace" },
    { label: "Arial Black", value: "'Arial Black', sans-serif" },
    { label: "Bookman", value: "'Bookman Old Style', serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Optima", value: "Optima, sans-serif" },
    { label: "Franklin Gothic", value: "'Franklin Gothic Medium', sans-serif" },
    { label: "Century Gothic", value: "'Century Gothic', sans-serif" },
    { label: "Brush Script MT", value: "'Brush Script MT', cursive" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[120px] justify-between flex items-center px-1.5 overflow-hidden shrink-0 rounded-sm hover:bg-neutral-200/80">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            key={value}
            className={cn(
              "flex font-[value] items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-400/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-400/80"
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

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;

  onClick?: () => void;
}

const ToolbarBUtton = ({
  icon: Icon,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false,
      },

      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false,
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
        isActive: false,
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
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("Bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("Italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("Underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Comment clicked"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("TaskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: editor?.isActive("TaskList"),
      },
    ],
  ];
  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 min-h-[40px] rounded-[20px] flex items-center gap-x-1 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarBUtton
          key={item.label}
          icon={item.icon}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
      {/* Add more sections as needed */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* Todo: Heading */}
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* Todo: Font Size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarBUtton key={item.label} {...item} />
      ))}

      {/* Text COlor */}
      {/* Text Highlights COlor */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* Todo: Link */}
      {/* Todo: Image */}
      {/* Todo: Align */}
      {/* Todo: LineHeight */}
      {/* Todo:  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolbarBUtton key={item.label} {...item} />
      ))}
    </div>
  );
};
