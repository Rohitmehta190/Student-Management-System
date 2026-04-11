import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Home, Compass, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
         <div className="absolute top-1/4 left-1/4 text-[20vw] font-black leading-none">404</div>
         <div className="absolute bottom-1/4 right-1/4 text-[20vw] font-black leading-none">NULL</div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-12"
      >
        <div className="space-y-4">
          <div className="inline-flex p-4 rounded-[2rem] bg-indigo-500/10 text-indigo-600 mb-6 shadow-xl shadow-indigo-500/5">
            <Compass size={64} className="animate-pulse" />
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-none">Lost in <br /><span className="text-primary italic-none">Transit.</span></h1>
          <p className="text-muted-foreground text-xl max-w-lg mx-auto font-medium leading-relaxed italic-none">
            The curriculum you are looking for has been moved or archived. Let's get you back to the classroom.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="rounded-[1.25rem] h-16 px-8 border-2 font-black text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button 
            size="lg" 
            onClick={() => navigate("/")}
            className="rounded-[1.25rem] h-16 px-10 font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" /> Return to Campus
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 flex items-center gap-2 text-muted-foreground/40 font-black text-[10px] uppercase tracking-widest italic-none">
         <GraduationCap size={16} /> Nexus Academy Security Protocol 404
      </div>
    </div>
  )
}
