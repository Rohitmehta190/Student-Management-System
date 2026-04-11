import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  UserSquare2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  School,
  Building2,
  CheckCircle2
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const roles = [
  { id: "student", label: "Student", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", desc: "Access courses and track your performance" },
  { id: "teacher", label: "Teacher", icon: UserSquare2, color: "text-purple-500", bg: "bg-purple-500/10", desc: "Manage classes and evaluate students" },
  { id: "admin", label: "Admin", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-500/10", desc: "Full institutional control and oversight" },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Creating your institutional account...',
        success: () => {
          setStep(3)
          return 'Account created successfully!'
        },
        error: 'Registration failed. Please try again.',
      }
    )
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4338ca05,transparent_50%)]" />
      
      {/* Left Side: Illustration / Branding */}
      <div className="hidden lg:flex flex-col relative p-16 bg-[#09090b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#6366f110,transparent_50%)]" />
        
        <Link to="/" className="relative z-10 flex items-center gap-3 font-black text-2xl tracking-tighter">
          <div className="p-2.5 rounded-[1.25rem] bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-xl">
            <GraduationCap size={28} />
          </div>
          <span>Nexus<span className="text-indigo-400">Academy</span></span>
        </Link>

        <div className="relative z-10 mt-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h1 className="text-5xl font-black leading-tight tracking-tight">
                  Choose your <br />
                  <span className="text-indigo-400">Perspective.</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-md font-medium leading-relaxed">
                  Select your role to get a tailored workspace designed for your specific needs in our academy.
                </p>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h1 className="text-5xl font-black leading-tight tracking-tight">
                  Join the <br />
                  <span className="text-indigo-400">Future of Learning.</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-md font-medium leading-relaxed">
                  Personalize your profile and secure your access to the most advanced educational console.
                </p>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h1 className="text-5xl font-black leading-tight tracking-tight">
                  You're <br />
                  <span className="text-indigo-400">All Set.</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-md font-medium leading-relaxed">
                  Your credentials have been verified and your workspace is being provisioned. Welcome to Nexus.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Step Content */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="signup-step-1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight">Select your role</h2>
                  <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-primary/60 italic-none">Who are you joining as?</p>
                </div>

                <div className="space-y-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-5 rounded-[2rem] border-2 transition-all duration-300 text-left",
                        selectedRole === role.id 
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                          : "border-muted/50 bg-muted/20 hover:border-muted-foreground/30"
                      )}
                    >
                      <div className={cn("p-4 rounded-2xl", role.bg, role.color)}>
                        <role.icon size={24} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                         <span className={cn("block font-black text-sm uppercase tracking-widest", selectedRole === role.id ? "text-primary" : "text-foreground")}>{role.label}</span>
                         <span className="block text-xs text-muted-foreground font-medium mt-1">{role.desc}</span>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full h-14 rounded-[1.25rem] font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20 group"
                >
                  Continue Registration
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <p className="text-center text-xs font-bold text-muted-foreground">
                  ALREADY HAVE AN ACCOUNT? {" "}
                  <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">SIGN IN</Link>
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="signup-step-2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="rounded-xl">
                      <ArrowLeft size={18} />
                   </Button>
                   <div className="space-y-1">
                      <h2 className="text-2xl font-black">Account Details</h2>
                      <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Step 2 of 2</p>
                   </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="s-name" className="font-black text-[10px] uppercase tracking-widest ml-1">Full Legal Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                      <Input id="s-name" placeholder="Rajesh Kumar" className="pl-12 h-14 rounded-[1.25rem] bg-muted/30 border-none font-medium" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s-email" className="font-black text-[10px] uppercase tracking-widest ml-1">University Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                      <Input id="s-email" type="email" placeholder="rajesh@nexus.edu" className="pl-12 h-14 rounded-[1.25rem] bg-muted/30 border-none font-medium" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s-pass" className="font-black text-[10px] uppercase tracking-widest ml-1">Secure Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                      <Input id="s-pass" type="password" placeholder="••••••••••••" className="pl-12 h-14 rounded-[1.25rem] bg-muted/30 border-none font-medium" required />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1">
                    <div className="h-4 w-4 rounded border flex items-center justify-center cursor-pointer bg-muted">
                        <CheckCircle2 size={10} className="text-primary hidden" />
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-tight">
                       I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Policy</span>.
                    </p>
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-[1.25rem] font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20" disabled={isLoading}>
                    {isLoading ? "Provisioning..." : "Create Account"}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="signup-step-3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="mx-auto w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                   <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                   >
                     <CheckCircle2 size={56} strokeWidth={2.5} />
                   </motion.div>
                </div>
                
                <div className="space-y-4">
                   <h2 className="text-4xl font-black tracking-tight">Welcome, Rajesh!</h2>
                   <p className="text-muted-foreground font-medium text-lg max-w-sm mx-auto">
                      Your identity has been verified. You're ready to start your journey at Nexus Academy.
                   </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Button 
                    onClick={() => navigate("/")} 
                    className="w-full h-14 rounded-[1.25rem] font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    Go to Dashboard
                  </Button>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Redirecting in 5 seconds...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
