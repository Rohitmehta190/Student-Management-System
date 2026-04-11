import { useState, useEffect } from "react"
import { Search, Command, Layout, Users, GraduationCap, Settings, Bell, BookOpen, CreditCard, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const items = [
  { group: "Navigation", items: [
    { name: "Dashboard", href: "/", icon: Layout },
    { name: "Student Directory", href: "/students", icon: Users },
    { name: "Faculty Directory", href: "/teachers", icon: GraduationCap },
    { name: "Course Catalog", href: "/courses", icon: BookOpen },
    { name: "Institutional Settings", href: "/settings", icon: Settings },
  ]},
  { group: "Quick Actions", items: [
    { name: "Mark Attendance", href: "/attendance", icon: Calendar },
    { name: "View Recent Results", href: "/results", icon: GraduationCap },
    { name: "Financial Ledger", href: "/fees", icon: CreditCard },
  ]}
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden rounded-3xl sm:max-w-2xl border-none shadow-2xl bg-card/95 backdrop-blur-xl">
        <div className="flex items-center border-b px-4 py-4 gap-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Type a command or search..." 
            className="flex-1 border-none bg-transparent focus-visible:ring-0 text-lg h-8 placeholder:text-muted-foreground/60 p-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted text-[10px] font-black uppercase tracking-widest text-muted-foreground border">
             Esc
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
          {items.map((group) => (
            <div key={group.group}>
              <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">{group.group}</h3>
              <div className="space-y-1">
                {group.items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).map((item) => (
                  <button
                    key={item.href}
                    onClick={() => runCommand(item.href)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all text-left group"
                  >
                    <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/10">
                      <item.icon size={18} />
                    </div>
                    <span className="font-bold text-sm">{item.name}</span>
                    <Badge variant="outline" className="ml-auto rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Go to</Badge>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
           <p className="text-[10px] font-bold text-muted-foreground italic">Tip: Use Arrow keys to navigate results</p>
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted-foreground">⌘ K</span>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
