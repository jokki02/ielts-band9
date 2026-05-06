"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from "lucide-react";

export function RichEditor({
  value,
  onChange,
  placeholder = "Start writing your essay…",
  minHeightClass = "min-h-[420px]",
  readOnly = false,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeightClass?: string;
  readOnly?: boolean;
}) {
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({})],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm sm:prose-base max-w-none focus:outline-none",
          minHeightClass,
        ),
        spellcheck: "true",
      },
    },
    immediatelyRender: false,
  });

  // Reset when external value changes drastically (e.g. after submission)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value && !editor.isFocused) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
      {!readOnly && (
        <div className="flex items-center gap-1 border-b border-border bg-card/80 px-2 py-1.5 flex-wrap">
          <ToolbarBtn
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet list"
          >
            <List className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered list"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            <Quote className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-3.5 w-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-3.5 w-3.5" />
          </ToolbarBtn>
        </div>
      )}
      <div className="p-4 sm:p-6">
        {editor.isEmpty && (
          <p className="absolute text-muted-foreground/70 pointer-events-none select-none">
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarBtn({
  active,
  onClick,
  disabled,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className="h-7 px-2"
    >
      {children}
    </Button>
  );
}

function Divider() {
  return <div className="h-5 w-px bg-border mx-1" />;
}
