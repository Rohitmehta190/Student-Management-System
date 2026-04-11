import { BellOff } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications Log</h1>
          <p className="text-muted-foreground font-medium">Keep track of all institutional activities and alerts.</p>
        </div>
      </div>
      
      <EmptyState 
        icon={BellOff}
        title="All Caught Up!"
        description="You have no unread notifications at the moment. We'll alert you as soon as something important happens."
        actionLabel="Verify Alert Settings"
        onAction={() => console.log("Navigate to settings")}
        className="min-h-[400px]"
      />
    </div>
  )
}
