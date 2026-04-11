import { useState } from "react"
import { 
  Layout, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserSquare2,
  RefreshCw
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuthStore, UserRole } from "@/store/use-auth-store"
import { toast } from "sonner"

const navigation = [
  { name: "Dashboard", href: "/", icon: Layout, roles: ["admin", "teacher", "student"] },
  { name: "Students", href: "/students", icon: Users, roles: ["admin", "teacher"] },
  { name: "Teachers", href: "/teachers", icon: GraduationCap, roles: ["admin"] },
  { name: "Courses", href: "/courses", icon: BookOpen, roles: ["admin", "teacher", "student"] },
  { name: "Attendance", href: "/attendance", icon: CheckCircle2, roles: ["admin", "teacher", "student"] },
  { name: "Results", href: "/results", icon: BarChart3, roles: ["admin", "teacher", "student"] },
  { name: "Fees", href: "/fees", icon: CreditCard, roles: ["admin", "student"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["admin", "teacher", "student"] },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { role, setRole, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const filteredNavigation = navigation.filter(item => item.roles.includes(role))

  const toggleRole = () => {
    const nextRole: UserRole = role === "admin" ? "teacher" : role === "teacher" ? "student" : "admin"
    setRole(nextRole)
    toast.success(`Role switched to ${nextRole.toUpperCase()}`, {
      description: "UI permissions have been updated dynamically."
    })
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      className="relative flex flex-col h-full bg-card border-r shadow-sm transition-all duration-300 ease-in-out z-50 group"
    >
      {/* Logo Section */}
      <div className="flex items-center h-20 px-6 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 p-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <GraduationCap size={24} />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tighter"
            >
              Nexus<span className="text-primary/60">Academy</span>
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group/nav",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon size={22} className={cn("transition-transform group-hover/nav:scale-110")} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-bold"
              >
                {item.name}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section: Role Switcher & User */}
      <div className="p-3 border-t bg-muted/20">
        {!isCollapsed && (
           <div className="mb-4 px-2">
              <div 
                onClick={toggleRole}
                className="flex items-center justify-between p-3 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/10 cursor-pointer transition-colors group/role"
              >
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                       {role === "admin" ? <ShieldCheck size={16} /> : role === "teacher" ? <UserSquare2 size={16} /> : <GraduationCap size={16} />}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase text-primary/60 tracking-widest">Active Role</span>
                       <span className="text-xs font-black uppercase">{role}</span>
                    </div>
                 </div>
                 <RefreshCw size={14} className="text-primary/40 group-hover/role:rotate-180 transition-transform duration-500" />
              </div>
           </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-3 overflow-hidden">
             <div className="h-10 w-10 rounded-xl bg-muted border-2 border-background shadow-sm flex items-center justify-center font-black text-xs">
                {user?.name.split(' ').map(n => n[0]).join('')}
             </div>
             {!isCollapsed && (
               <div className="flex flex-col flex-1 min-w-0">
                 <span className="text-sm font-bold truncate">{user?.name}</span>
                 <span className="text-[10px] font-black text-muted-foreground uppercase truncate tracking-tighter">{role} • Active</span>
               </div>
             )}
          </div>
          
          <button 
            onClick={() => {
              logout()
              navigate("/login")
            }}
            className={cn(
               "w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-destructive hover:bg-destructive/10 transition-colors",
               isCollapsed && "justify-center"
            )}
          >
            <LogOut size={22} />
            {!isCollapsed && <span className="text-sm font-bold">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 h-6 w-6 rounded-full border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  )
}
