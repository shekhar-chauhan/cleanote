"use client"

import { useState, useCallback } from "react"
import type React from "react"
import { Save, Trash2, Menu, X, LogOut, RefreshCw, PenTool, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "../context/user-context"
import { useDrive } from "../context/drive-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NoteContent } from "./note-content"
import { useMobile } from "@/hooks/use-mobile"

// Custom profile avatar component
const ProfileAvatar = ({ user, onClick }) => {
  if (user?.picture) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={onClick}
      >
        <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-purple-300/30">
          <img src={user.picture || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
        </div>
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
        <PenTool className="h-4 w-4" />
      </div>
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  )
}

// CleaNote logo with animation
const CleaNoteLogo = () => {
  return (
    <div className="relative px-2">
      <motion.div
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 0 0 rgba(168, 85, 247, 0.2)",
            "0 0 15px rgba(168, 85, 247, 0.4)",
            "0 0 0 rgba(168, 85, 247, 0.2)",
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="absolute -inset-4 bg-purple-500/10 rounded-full blur-md -z-10"
      />
      <div className="relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 font-bold text-lg">
          CN
        </span>
        <motion.span
          className="absolute inset-0 border border-purple-500/30 rounded-md"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  )
}

export default function NoteApp() {
  const { user, logout } = useUser()
  const {
    notes,
    activeTab,
    openTabs,
    isLoading,
    isSyncing,
    syncError,
    setActiveTab,
    addNote,
    updateNote,
    deleteNote,
    saveNoteToFile,
    closeTab,
    openTab,
  } = useDrive()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notesListView, setNotesListView] = useState(false)
  const isMobile = useMobile()

  const handleContentChange = useCallback(
    (content: string) => {
      updateNote(activeTab, content)
    },
    [activeTab, updateNote],
  )

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    closeTab(id)
  }

  const getTabTitle = (content: string) => {
    const firstLine = content.split("\n")[0].trim()
    if (!firstLine) return "Untitled"

    // Truncate based on screen size and number of tabs
    const maxLength = isMobile ? Math.max(6, 15 - notes.length) : Math.max(10, 30 - notes.length * 2)

    return firstLine.length > maxLength ? firstLine.substring(0, maxLength) + "..." : firstLine
  }

  // Handle back button action in mobile list view
  const handleBackToEditor = () => {
    setNotesListView(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50">
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="text-purple-600 text-2xl font-bold"
          >
            CN
          </motion.div>
          <p className="text-sm text-gray-500">Loading your notes...</p>
        </div>
      </div>
    )
  }

  // For mobile: if we're in notes list view, show that instead of the editor
  if (isMobile && notesListView) {
    return (
      <div className="flex flex-col h-screen w-full bg-amber-50">
        <header className="flex items-center justify-between p-4 border-b bg-amber-50">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBackToEditor} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to editor</span>
            </Button>
            <h1 className="text-lg font-semibold">All Notes</h1>
          </div>
          <Button
            onClick={() => {
              addNote()
              setNotesListView(false)
            }}
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </header>

        <div className="overflow-y-auto flex-1 p-3">
          <AnimatePresence>
            <ul className="space-y-3">
              {notes.map((note, index) => {
                const firstLine = note.content.split("\n")[0].trim() || "Untitled"
                const restContent = note.content.split("\n").slice(1).join("\n").trim()
                const previewContent = restContent.length > 60 ? restContent.substring(0, 60) + "..." : restContent

                return (
                  <motion.li
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-lg border p-3 ${
                      note.id === activeTab ? "bg-amber-100 border-amber-300" : "border-amber-200"
                    }`}
                  >
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        openTab(note.id)
                        setNotesListView(false)
                      }}
                    >
                      <div className="font-bold text-lg truncate">{firstLine}</div>
                      {previewContent && (
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{previewContent}</div>
                      )}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-full bg-amber-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full w-full">
        <header className="flex justify-between items-center p-2 border-b bg-amber-50">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              {isMobile ? (
                // Mobile header with just menu button
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setNotesListView(true)}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Notes List</span>
                </Button>
              ) : (
                // Desktop header with sidebar sheet and tabs
                <>
                  <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="mr-2">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[280px] bg-amber-50 p-0"
                      motionProps={{
                        initial: { x: -100, opacity: 0 },
                        animate: { x: 0, opacity: 1 },
                        exit: { x: -100, opacity: 0 },
                        transition: { type: "spring", bounce: 0.1, duration: 0.5 },
                      }}
                    >
                      <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold">All Notes</h2>
                        {isSyncing && (
                          <div className="flex items-center text-xs text-gray-500">
                            <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                            Syncing...
                          </div>
                        )}
                      </div>
                      <AnimatePresence>
                        <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                          <ul className="space-y-2">
                            {notes.map((note, index) => {
                              const firstLine = note.content.split("\n")[0].trim() || "Untitled"
                              const restContent = note.content.split("\n").slice(1).join("\n").trim()
                              const previewContent =
                                restContent.length > 50 ? restContent.substring(0, 50) + "..." : restContent

                              return (
                                <motion.li
                                  key={note.id}
                                  className={`cursor-pointer hover:bg-amber-100 p-2 rounded ${
                                    note.id === activeTab ? "bg-amber-100" : ""
                                  }`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <button
                                    className="w-full text-left"
                                    onClick={() => {
                                      openTab(note.id)
                                      setSidebarOpen(false)
                                    }}
                                  >
                                    <div className="font-bold truncate">{firstLine}</div>
                                    {previewContent && (
                                      <div className="text-xs text-gray-500 truncate mt-1">{previewContent}</div>
                                    )}
                                  </button>
                                </motion.li>
                              )
                            })}
                          </ul>
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => {
                              addNote()
                              setSidebarOpen(false)
                            }}
                          >
                            New Note
                          </Button>
                        </div>
                      </AnimatePresence>
                    </SheetContent>
                  </Sheet>
                  <TabsList className="bg-amber-50">
                    {openTabs.map((tabId) => {
                      const note = notes.find((n) => n.id === tabId)
                      if (!note) return null
                      return (
                        <TabsTrigger
                          key={note.id}
                          value={note.id}
                          className="px-4 bg-amber-50 data-[state=active]:bg-amber-50 flex items-center gap-1 max-w-[150px]"
                        >
                          <span className="truncate">{getTabTitle(note.content) || "Untitled"}</span>
                          <button
                            onClick={(e) => handleCloseTab(note.id, e)}
                            className="ml-1 rounded-full hover:bg-amber-200 p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </TabsTrigger>
                      )
                    })}
                    <Button variant="ghost" size="sm" onClick={addNote} className="h-8 px-2 ml-1 bg-amber-50">
                      +
                    </Button>
                  </TabsList>
                </>
              )}
            </div>

            <div className="flex items-center">
              {/* For mobile, display active note title */}
              {isMobile && (
                <div className="text-sm font-medium truncate max-w-[120px] mr-2">
                  {getTabTitle(notes.find((n) => n.id === activeTab)?.content || "")}
                </div>
              )}

              <div className="flex items-center space-x-1 sm:space-x-2">
                {/* Action buttons */}
                {isMobile ? (
                  // Mobile buttons - less space between them, less tooltip usage
                  <>
                    <Button variant="ghost" size="icon" onClick={() => deleteNote(activeTab, true)} className="h-9 w-9">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveNoteToFile(activeTab)}
                      disabled={!notes.find((n) => n.id === activeTab)?.content.trim() || isSyncing}
                      className="h-9 w-9 relative"
                    >
                      {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    </Button>
                  </>
                ) : (
                  // Desktop buttons with tooltips
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNote(activeTab, true)}
                          className="mr-2"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Delete note</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete note</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveNoteToFile(activeTab)}
                          disabled={!notes.find((n) => n.id === activeTab)?.content.trim() || isSyncing}
                          className="mr-2 relative"
                        >
                          {isSyncing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                          {user && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isSyncing ? 1 : 0 }}
                              className="absolute -bottom-1 -right-1 text-[10px] text-purple-500 bg-amber-50 rounded-full px-1"
                            >
                              Auto
                            </motion.span>
                          )}
                          <span className="sr-only">Save note</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {user ? (isSyncing ? "Saving..." : "Save to Google Drive") : "Download as .txt"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {/* Logo */}
                <CleaNoteLogo />

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="ml-1">
                      <ProfileAvatar user={user} onClick={() => {}} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {user && (
                      <div className="px-2 py-1.5 text-sm">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    )}
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {syncError && <div className="bg-red-100 text-red-800 text-sm p-2 text-center">{syncError}</div>}
          {notes.map((note) => (
            <TabsContent key={note.id} value={note.id} className="h-full p-0 m-0">
              <NoteContent
                note={note}
                onChange={(content) => handleContentChange(content)}
                isActive={note.id === activeTab}
              />
            </TabsContent>
          ))}
        </main>

        {/* Mobile-only floating action button for new note */}
        {isMobile && (
          <Button
            onClick={addNote}
            className="absolute bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}
      </Tabs>
    </div>
  )
}
