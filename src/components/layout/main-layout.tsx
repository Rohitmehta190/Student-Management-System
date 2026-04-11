import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { motion, AnimatePresence } from "framer-motion"
import { CommandPalette } from "./command-palette"

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans italic-none">
      <CommandPalette />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.16, 1, 0.3, 1] // Out-expo style
              }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
