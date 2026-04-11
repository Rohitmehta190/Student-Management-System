import { Bell, Search, Moon, Sun, Search as SearchIcon } from "lucide-react"
import { useTheme } from "@/lib/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Breadcrumbs } from "./breadcrumbs"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 flex items-center h-20 px-6 border-b glass">
      <div className="flex flex-col flex-1 gap-1.5">
        <Breadcrumbs />
        <div className="relative w-full max-w-md group">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search everything..." 
            className="pl-9 h-9 bg-muted/40 border-none focus-visible:bg-background focus-visible:ring-primary/20 transition-all rounded-xl text-xs"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-8 rounded-md bg-muted border flex items-center justify-center pointer-events-none">
             <span className="text-[9px] font-black text-muted-foreground uppercase opacity-50">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl hover:bg-muted/80"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger {...({ asChild: true } as any)}>
            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted/80">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 border-2 border-background">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl">
            <DropdownMenuLabel className="p-4 flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">Mark all read</Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="p-4 cursor-pointer focus:bg-muted/50">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">New student registration</p>
                      <p className="text-xs text-muted-foreground">Sarah Jenkins has joined the Science 101 course.</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">2 mins ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 text-center justify-center text-xs text-primary font-medium hover:bg-muted">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-[1px] bg-border mx-2" />
        
        <Button variant="outline" className="rounded-xl border-2 font-semibold">
          Upgrade Pro
        </Button>
      </div>
    </header>
  )
}
