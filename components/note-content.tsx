"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"

interface NoteContentProps {
  note: {
    id: string
    content: string
    fileId?: string
    lastSynced?: number
    isEditing?: boolean
  }
  onChange: (content: string) => void
  isActive: boolean
}

export function NoteContent({ note, onChange, isActive }: NoteContentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [localContent, setLocalContent] = useState(note.content)
  const prevNoteIdRef = useRef(note.id)

  // Only update local content when the note ID changes or when not actively editing
  useEffect(() => {
    if (prevNoteIdRef.current !== note.id) {
      setLocalContent(note.content)
      prevNoteIdRef.current = note.id
    }
  }, [note.id, note.content])

  // Focus the textarea when it becomes active
  useEffect(() => {
    if (isActive && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isActive])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value
      setLocalContent(newContent)
      onChange(newContent)
    },
    [onChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        const start = target.selectionStart
        const end = target.selectionEnd

        // Insert tab at cursor position
        const newContent = localContent.substring(0, start) + "    " + localContent.substring(end)
        setLocalContent(newContent)
        onChange(newContent)

        // Move cursor after the inserted tab
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4
          }
        }, 0)
      }
    },
    [localContent, onChange],
  )

  return (
    <div className="relative h-full bg-amber-50">
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full h-full p-6 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
        placeholder="Start typing..."
        style={{ caretColor: "#000" }}
      />
    </div>
  )
}
