"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import FontFamily from "@tiptap/extension-font-family";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { History } from "@tiptap/extension-history"; // ⭐ Yeh add karo
import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { types } from "util";

// ! Fixing the image Resize extention :-

// todo=> When We Run The Command  npm i tiptap-extention-resize-image@1.2.1 --legacy-peer-deps and after that clear npm-catch then problem will be resoleved .....
let ImageResize: any = null;
try {
  ImageResize = require("tiptap-extension-resize-image").default;
} catch (error) {
  console.warn("ImageResize extension not found, skipping...");
}

export const Editor = () => {
  const { setEditor } = useEditorStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,

    onCreate({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onDestroy() {
      if (setEditor) {
        setEditor(null);
      }
    },
    onUpdate({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onSelectionUpdate({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onTransaction({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onFocus({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onBlur({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },
    onContentError({ editor }) {
      if (setEditor) {
        setEditor(editor);
      }
    },

    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1055px] w-[816px] pt-10 pr-14 pb-10 cursor-text border-2 rounded-lg shadow-sm print:shadow-none print:min-h-0 print:w-full print:p-0 print:overflow-hidden",
      },
    },

    extensions: [
      // ⭐ StarterKit se history remove kar diya
      StarterKit.configure({
        history: false, // Disable default history
      }),

      // ⭐ Manual History extension add kiya with custom config
      History.configure({
        depth: 100, // 100 steps tak undo kar sakte ho
        newGroupDelay: 500, // 500ms delay after typing to create new undo group
      }),

      // Text styling extensions
      TextStyle,
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),

      // Text alignment
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      // Styling extensions
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,

      // Link extension
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),

      // Image extensions
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-stone-200 max-w-full h-auto",
        },
        allowBase64: true,
      }),

      // ImageResize only if available
      ...(ImageResize ? [ImageResize] : []),

      // Task extensions
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start my-4",
        },
      }),

      // Table extensions
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-gray-300",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class:
            "border border-gray-300 px-4 py-2 bg-gray-50 font-bold text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-300 px-4 py-2",
        },
      }),
    ].filter(Boolean),

    content: `
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th colspan="3">Description</th>
          </tr>
          <tr>
            <td>Cyndi Lauper</td>
            <td>Singer</td>
            <td>Songwriter</td>
            <td>Actress</td>
          </tr>
        </tbody>
      </table>
    `,
  });

  if (!isMounted || !editor) {
    return (
      <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-hidden">
        <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
          <div className="focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1055px] w-[816px] pt-10 pr-14 pb-10 cursor-text border-2 rounded-lg shadow-sm print:shadow-none print:min-h-0 print:w-full print:p-0 print:overflow-hidden">
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-hidden">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
