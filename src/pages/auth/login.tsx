import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Mail, Lock, Globe, Code, Key, User, ShieldCheck, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAuthStore, UserRole } from "@/store/use-auth-store"

const roles = [
  { id: "student", label: "Student", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "teacher", label: "Teacher", icon: User, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "admin", label: "Admin", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-500/10" },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setRole, setUser } = useAuthStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Authenticating...',
        success: () => {
          // Setting up the global state
          setRole(selectedRole)
          setUser({
            name: selectedRole === "admin" ? "Dr. Rajesh Kumar" : selectedRole === "teacher" ? "Prof. Sarah Miller" : "Alice Johnson",
            email: "user@nexus.edu",
            avatar: `https://i.pravatar.cc/150?u=${selectedRole}`
          })
          
          navigate("/")
          return `Welcome back to Nexus Academy, ${selectedRole.toUpperCase()}!`
        },
        error: 'Authentication failed. Please verify your credentials.',
      }
    )
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden selection:bg-indigo-100 italic-none">
      {/* Left Side: Visual Branding (SaaS Style) */}
      <div className="hidden lg:flex flex-col relative p-16 bg-[#09090b] text-white border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4338ca20,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#6366f115,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        
        <Link to="/" className="relative z-10 flex items-center gap-3 font-black text-2xl tracking-tighter">
          <div className="p-2.5 rounded-[1.25rem] bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-xl">
            <GraduationCap size={28} className="text-white" />
          </div>
          <span className="text-white">Nexus<span className="text-indigo-400">Academy</span></span>
        </Link>

        <div className="relative z-10 mt-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-black leading-[1.05] tracking-tight mb-8">
              The OS for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 text-6xl">Modern Learning.</span>
            </h1>
            <p className="text-zinc-400 text-xl max-w-lg leading-relaxed font-medium">
              Join thousands of institutions scaling their education operations with our world-class management suite.
            </p>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-[#09090b] bg-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl">
                     <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="user" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-full border-4 border-[#09090b] bg-indigo-600 flex items-center justify-center font-black text-[10px] shadow-2xl">
                   +2k
                 </div>
               </div>
               <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                     {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                  </div>
                  <p className="text-sm text-zinc-400 font-bold">4.9/5 Rating by Educational Leaders</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-foreground">Sign in to Console</h2>
            <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-primary/60 italic-none">Institutional Access Control</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className={cn(
                  "group relative flex flex-col items-center gap-3 p-4 rounded-[2rem] border-2 transition-all duration-300",
                  selectedRole === role.id 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-[1.02]" 
                    : "border-transparent bg-muted/20 hover:bg-muted/40 hover:scale-[1.02]"
                )}
              >
                <div className={cn("p-2.5 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-sm", role.bg, role.color)}>
                  <role.icon size={22} strokeWidth={2.5} />
                </div>
                <span className={cn("text-[10px] font-black uppercase tracking-widest", selectedRole === role.id ? "text-primary" : "text-muted-foreground")}>{role.label}</span>
                {selectedRole === role.id && (
                  <motion.div layoutId="role-indicator" className="absolute -bottom-1 w-8 h-1 bg-primary rounded-full shadow-lg" />
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-black text-[10px] uppercase tracking-widest ml-1">Official ID Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                <Input id="email" type="email" placeholder="admin.id@nexus.edu" className="pl-12 h-14 rounded-[1.25rem] bg-muted/30 border-none font-medium text-base shadow-sm" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="font-black text-[10px] uppercase tracking-widest">Access Key</Label>
                <Link to="/forgot-password" pull-right className="text-[10px] uppercase font-black text-muted-foreground hover:text-primary tracking-[0.2em]">Reset Key?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                <Input id="password" type="password" placeholder="••••••••••••" className="pl-12 h-14 rounded-[1.25rem] bg-muted/30 border-none font-medium text-base shadow-sm" required />
              </div>
            </div>

            <Button className="w-full h-14 rounded-[1.25rem] font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group/btn" disabled={isLoading}>
              {isLoading ? "Validating Session..." : (
                <div className="flex items-center gap-2">
                   Open Dashboard
                   <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted-foreground/10" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]"><span className="bg-background px-4 text-muted-foreground/40">Third-Party SSO</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-[1.25rem] border-2 gap-3 hover:bg-muted font-black text-xs uppercase tracking-widest transition-transform hover:scale-[1.02]">
              <Globe className="h-5 w-5 text-orange-500" /> Google
            </Button>
            <Button variant="outline" className="h-14 rounded-[1.25rem] border-2 gap-3 hover:bg-muted font-black text-xs uppercase tracking-widest transition-transform hover:scale-[1.02]">
              <Code className="h-5 w-5" /> GitHub
            </Button>
          </div>

          <p className="text-center text-xs font-bold text-muted-foreground italic-none">
            UNAUTHORIZED ACCESS IS PROHIBITED. {" "}
            <Link to="/signup" className="text-primary font-black hover:underline underline-offset-4 tracking-tighter">REQUEST ACCESS</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
