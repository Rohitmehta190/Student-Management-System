import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem] bg-card/50 border-2 border-dashed border-muted overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 space-y-6 max-w-sm">
        <div className="mx-auto w-24 h-24 rounded-[2rem] bg-muted/50 flex items-center justify-center text-muted-foreground/40 shadow-inner">
           <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
           <h3 className="text-xl font-black tracking-tight">{title}</h3>
           <p className="text-sm font-medium text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {actionLabel && (
          <Button 
            onClick={onAction} 
            className="rounded-2xl h-11 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/10"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
