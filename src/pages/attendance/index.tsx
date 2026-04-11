import { useState } from "react"
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Filter,
  Download,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock3
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const attendanceStats = [
  { label: "Present Today", value: "854", total: "1,000", color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Absent Today", value: "124", total: "1,000", color: "text-red-500", bg: "bg-red-500/10" },
  { label: "Late Arrival", value: "22", total: "1,000", color: "text-orange-500", bg: "bg-orange-500/10" },
]

const studentsData = [
  { id: "ST001", name: "Alice Johnson", status: "Present", time: "08:45 AM", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "ST002", name: "Bob Smith", status: "Absent", time: "-", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "ST003", name: "Charlie Davis", status: "Present", time: "08:55 AM", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "ST004", name: "Diana Prince", status: "Late", time: "09:15 AM", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "ST005", name: "Ethan Hunt", status: "Present", time: "08:30 AM", avatar: "https://i.pravatar.cc/150?u=5" },
]

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [students, setStudents] = useState(studentsData)

  const updateStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s))
    toast.message(`Status updated for ${id}`, {
      description: `Student marked as ${newStatus}.`,
    })
  }

  const submitAttendance = () => {
    toast.success("Attendance Submitted", {
      description: "Class CS Section A attendance has been recorded for today.",
    })
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">Monitor and record daily attendance for all departments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-bold h-11 border-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button
            onClick={submitAttendance}
            className="rounded-xl gap-2 font-black h-11 shadow-lg shadow-primary/20 px-8"
          >
            Submit Daily Log
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {attendanceStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-3xl bg-card overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-4 rounded-2xl shadow-sm", stat.bg, stat.color)}>
                  {stat.label === "Present Today" ? <CheckCircle2 size={24} /> : stat.label === "Absent Today" ? <XCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black">{stat.value}</h3>
                    <span className="text-xs font-bold text-muted-foreground/60">/ {stat.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-4 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black">Calendar View</CardTitle>
            <CardDescription className="font-medium text-xs">Verify historical records.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-2xl border-none p-3 pointer-events-auto"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-8 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 space-y-2 md:space-y-0">
            <div>
              <CardTitle className="text-xl font-black">Class Roster</CardTitle>
              <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary/60">Section A • Computer Science • Year 3</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="cs-a">
                <SelectTrigger className="w-48 rounded-2xl h-11 bg-muted/30 border-none font-bold">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="cs-a">CS Section A</SelectItem>
                  <SelectItem value="cs-b">CS Section B</SelectItem>
                  <SelectItem value="me-a">Mechanical A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 rounded-3xl bg-muted/20 border border-muted/20 transition-all hover:bg-muted/30">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-11 w-11 border-2 border-background shadow-md">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="font-bold">{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-black">{student.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{student.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Entry Time</span>
                      <span className="text-sm font-bold">{student.time}</span>
                    </div>

                    <div className="flex h-10 items-center gap-1 bg-background/50 p-1 rounded-2xl border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateStatus(student.id, "Present")}
                        className={cn(
                          "h-8 w-8 rounded-xl transition-all",
                          student.status === "Present" ? "bg-green-500 text-white shadow-lg" : "hover:bg-green-100/50"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateStatus(student.id, "Late")}
                        className={cn(
                          "h-8 w-8 rounded-xl transition-all",
                          student.status === "Late" ? "bg-orange-500 text-white shadow-lg" : "hover:bg-orange-100/50"
                        )}
                      >
                        <Clock3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateStatus(student.id, "Absent")}
                        className={cn(
                          "h-8 w-8 rounded-xl transition-all",
                          student.status === "Absent" ? "bg-red-500 text-white shadow-lg" : "hover:bg-red-100/50"
                        )}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest text-muted-foreground hover:text-primary h-12">
              Load More Students From Section A
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
