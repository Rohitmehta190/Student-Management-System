import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  UserSquare2, 
  BookOpen, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar as CalendarIcon
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/services/api"
import { cn } from "@/lib/utils"

const enrolmentData = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1900 },
  { month: "Mar", students: 1500 },
  { month: "Apr", students: 2400 },
  { month: "May", students: 2100 },
  { month: "Jun", students: 2800 },
]

const attendanceByDepartment = [
  { name: "Science", value: 95, color: "#6366f1" },
  { name: "Arts", value: 88, color: "#a855f7" },
  { name: "Commerce", value: 92, color: "#f97316" },
  { name: "Humanities", value: 90, color: "#10b981" },
]

const recentActivities = [
  { id: 1, user: "John Doe", action: "enrolled in", target: "Advanced Physics", time: "2 hours ago", avatar: "JD" },
  { id: 2, user: "Prof. Sarah", action: "uploaded grades for", target: "Mathematics II", time: "4 hours ago", avatar: "PS" },
  { id: 3, user: "Admin", action: "updated", target: "Holiday Calendar", time: "5 hours ago", avatar: "AD" },
  { id: 4, user: "Mike Ross", action: "paid fees for", target: "Semester 2", time: "1 day ago", avatar: "MR" },
]

export default function DashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: api.stats.getDashboard
  })

  const statsList = [
    { label: "Total Students", value: statsData?.totalStudents?.toLocaleString() || "0", change: "+12.5%", trending: "up", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Teachers", value: statsData?.totalTeachers?.toLocaleString() || "0", change: "+4.2%", trending: "up", icon: UserSquare2, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Total Courses", value: statsData?.activeCourses?.toLocaleString() || "0", change: "+2.1%", trending: "up", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Avg. Attendance", value: `${statsData?.avgAttendance || 0}%`, change: "-1.5%", trending: "down", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  ]

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your academy's performance and key metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-bold">
            <CalendarIcon className="h-4 w-4" /> Last 30 Days
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold">Download Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsList.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden bg-card">
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-6 w-16 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                       <Skeleton className="h-4 w-24" />
                       <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn("p-2 rounded-xl transition-colors", stat.bg, stat.color)}>
                        <stat.icon size={22} />
                      </div>
                      <Badge variant="secondary" className={cn(
                        "rounded-lg font-black text-[10px] uppercase",
                        stat.trending === "up" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                      )}>
                        {stat.trending === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Enrollment Trends</CardTitle>
              <CardDescription>Number of students joined per month</CardDescription>
            </div>
            {!isLoading && (
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest">
                   <div className="h-2 w-2 rounded-full bg-primary" />
                   <span>This Year</span>
                 </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="h-[350px] pl-2">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrolmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderRadius: '16px', 
                      border: '1px solid hsl(var(--border))',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 900, fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorStudents)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardHeader>
            <CardTitle>Departmental Performance</CardTitle>
            <CardDescription>Academic achievement vs target</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            {isLoading ? (
               <div className="space-y-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-full rounded-full" />
                   </div>
                 ))}
               </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceByDepartment} layout="vertical" barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--foreground))', fontWeight: 800, fontSize: 11 }}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                    {attendanceByDepartment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Feed & Activities</CardTitle>
            <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3 font-bold text-xs uppercase tracking-tighter hover:bg-muted">Explore Feed</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {(isLoading ? Array(4).fill(0) : recentActivities).map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                         <Skeleton className="h-4 w-3/4" />
                         <Skeleton className="h-3 w-1/4" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-black tracking-tighter uppercase">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          <span className="font-black text-primary/80">{activity.user}</span> <span className="text-muted-foreground font-medium">{activity.action}</span> <span className="text-primary font-black underline decoration-primary/20 underline-offset-4">{activity.target}</span>
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <CalendarIcon size={120} />
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-white text-xl font-black">Upcoming Events</CardTitle>
            <CardDescription className="text-indigo-100/70 font-medium">Monthly schedule Highlights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full rounded-2xl bg-white/10" />
                <Skeleton className="h-16 w-full rounded-2xl bg-white/10" />
              </div>
            ) : (
              <>
                {[
                  { date: "15", month: "Apr", title: "Sports Meet 2024", time: "09:00 AM" },
                  { date: "22", month: "Apr", title: "Faculty Workshop", time: "02:00 PM" }
                ].map((event, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl transition-all hover:bg-white/15">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white text-indigo-700 flex flex-col items-center justify-center shadow-lg">
                        <span className="text-sm font-black leading-none">{event.date}</span>
                        <span className="text-[10px] font-black uppercase tracking-tighter">{event.month}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-black tracking-tight">{event.title}</p>
                        <p className="text-[10px] text-indigo-100/70 font-bold uppercase tracking-widest mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 font-black rounded-2xl mt-2 h-11 shadow-xl transition-transform active:scale-95">
                  Launch Calendar
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
