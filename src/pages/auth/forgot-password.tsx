import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Key, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCcw,
  ShieldCheck,
  Send
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Verifying identity...',
        success: () => {
          setStep(2)
          return 'Recovery email sent!'
        },
        error: 'Failed to send recovery email.',
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10 space-y-4">
           <div className="mx-auto w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-inner group">
              <Key size={32} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-500" />
           </div>
           <div>
              <h1 className="text-3xl font-black tracking-tight">Recover Access</h1>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-2 italic-none">Institutional Security Portal</p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="forgot-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <CardContent className="p-0 space-y-8">
                <div className="p-6 rounded-3xl bg-muted/30 border border-muted/50 text-sm font-medium leading-relaxed">
                   Enter the official email associated with your institutional profile. We will send a secure magic link to recover your access key.
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-black text-[10px] uppercase tracking-widest ml-1">Official ID Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary h-4 w-4" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="admin.id@nexus.edu" 
                        className="pl-12 h-14 rounded-[1.25rem] bg-muted/40 border-none font-medium text-base shadow-sm"
                        required 
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-[1.25rem] font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20 group h-auto" disabled={isLoading}>
                    {isLoading ? (
                      <RefreshCcw className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-2">
                        Send Recovery Link
                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="forgot-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center space-y-6"
            >
              <div className="p-8 rounded-[2.5rem] bg-green-500/5 border border-green-500/20 text-green-700 dark:text-green-400">
                 <CheckCircle2 size={48} className="mx-auto mb-4" />
                 <h3 className="text-xl font-bold mb-2">Check your inbox</h3>
                 <p className="text-sm font-medium">A magic link has been sent to your email. It will expire in 15 minutes for your security.</p>
              </div>
              
              <div className="pt-4 space-y-4">
                <Button variant="outline" className="w-full h-14 rounded-[1.25rem] font-black text-xs uppercase tracking-widest border-2" onClick={() => setStep(1)}>
                   Try Different Email
                </Button>
                <Button variant="ghost" className="w-full h-14 rounded-[1.25rem] font-black text-xs uppercase tracking-widest" onClick={() => navigate("/login")}>
                   Back to Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
           <Link to="/login" className="text-sm font-black text-muted-foreground hover:text-primary tracking-widest uppercase flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Back to Sign In
           </Link>
        </div>
      </motion.div>
    </div>
  )
}

function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}
