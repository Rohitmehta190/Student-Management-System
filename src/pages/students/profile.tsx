import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  Award, 
  BookOpen, 
  Clock, 
  FileText,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { cn } from "@/lib/utils"

const performanceData = [
  { term: "Term 1", gpa: 3.4 },
  { term: "Term 2", gpa: 3.8 },
  { term: "Term 3", gpa: 3.6 },
  { term: "Term 4", gpa: 3.9 },
  { term: "Term 5", gpa: 4.0 },
]

export default function StudentProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/students")} 
          className="rounded-xl h-10 w-10 border bg-background shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Student Profile</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Directory</span>
            <span>/</span>
            <span className="text-primary">Alice Johnson</span>
          </nav>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Personal Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-card overflow-hidden text-center relative pt-12 pb-8">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
            <CardContent className="relative z-10 space-y-6">
              <div className="flex flex-col items-center">
                 <div className="relative">
                   <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                     <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                     <AvatarFallback className="text-2xl font-black">AJ</AvatarFallback>
                   </Avatar>
                   <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-4 border-background rounded-full" />
                 </div>
                 <h2 className="text-2xl font-black mt-4">Alice Johnson</h2>
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Computer Science • Year 3</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                 <Badge variant="secondary" className="rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest bg-indigo-500/10 text-indigo-600">Active</Badge>
                 <Badge variant="secondary" className="rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest bg-yellow-500/10 text-yellow-600">Dean's List</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="p-4 rounded-3xl bg-muted/30 border border-muted/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Current GPA</p>
                    <p className="text-2xl font-black text-primary">4.0</p>
                 </div>
                 <div className="p-4 rounded-3xl bg-muted/30 border border-muted/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Rank</p>
                    <p className="text-2xl font-black text-primary">04</p>
                 </div>
              </div>

              <div className="space-y-3 pt-4 text-left px-2">
                 <div className="flex items-center gap-3 text-sm font-medium">
                    <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                      <Mail size={16} />
                    </div>
                    <span>alice.j@nexus.edu</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm font-medium">
                    <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                      <Phone size={16} />
                    </div>
                    <span>+1 (555) 000-1111</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm font-medium">
                    <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                      <MapPin size={16} />
                    </div>
                    <span>San Francisco, CA</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-card p-6 space-y-4">
             <CardTitle className="text-lg font-black tracking-tight">Certificates</CardTitle>
             <div className="space-y-3">
               {[
                 { title: "Python for Data Science", date: "Jan 2024", provider: "IBM" },
                 { title: "Advanced Algorithms", date: "Dec 2023", provider: "Nexus" }
               ].map((cert, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-muted/20 group hover:bg-muted/40 transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                       <Award size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                       <span className="text-sm font-bold truncate">{cert.title}</span>
                       <span className="text-[10px] uppercase font-black text-muted-foreground/60">{cert.provider} • {cert.date}</span>
                    </div>
                 </div>
               ))}
             </div>
          </Card>
        </div>

        {/* Right Column: Performance & Attendance */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <div>
                  <CardTitle className="text-xl font-black">Performance Trend</CardTitle>
                  <CardDescription className="font-medium">Academic Grade Point Average over terms.</CardDescription>
               </div>
               <Badge className="bg-primary/10 text-primary border-none font-black uppercase tracking-widest h-8 px-4 rounded-xl">Consistent Excellence</Badge>
            </CardHeader>
            <CardContent className="h-[300px] pl-0">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={performanceData}>
                   <defs>
                     <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                       <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                   <XAxis 
                      dataKey="term" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 800 }}
                      dy={10}
                    />
                   <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 800 }}
                      domain={[0, 4.0]}
                    />
                   <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                   />
                   <Area 
                     type="monotone" 
                     dataKey="gpa" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorGpa)" 
                     animationDuration={2000}
                   />
                 </AreaChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
             <Card className="border-none shadow-sm rounded-[2rem] bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <CardTitle className="text-xl font-black">Total Attendance</CardTitle>
                  <Badge className="bg-green-100 text-green-700 font-black rounded-lg text-[10px]">98.4%</Badge>
                </div>
                <div className="grid grid-cols-10 gap-1.5 mb-6">
                   {Array(50).fill(0).map((_, i) => (
                     <div 
                        key={i} 
                        className={cn(
                          "aspect-square rounded-[3px]",
                          i === 12 || i === 34 ? "bg-red-500/20" : "bg-green-500/60"
                        )} 
                        title="Daily log"
                      />
                   ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-green-500/60" /> Present</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-red-500/20" /> Absent</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-muted" /> Upcoming</div>
                </div>
             </Card>

             <Card className="border-none shadow-sm rounded-[2rem] bg-card p-6">
                <CardTitle className="text-xl font-black mb-6">Enrolled Courses</CardTitle>
                <div className="space-y-4">
                   {[
                     { name: "Algorithms & Logic", progress: 85, color: "bg-blue-500" },
                     { name: "Database Engineering", progress: 42, color: "bg-purple-500" },
                     { name: "UI/UX Design Systems", progress: 95, color: "bg-orange-500" }
                   ].map((course, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                           <span className="truncate max-w-[150px]">{course.name}</span>
                           <span className="text-muted-foreground">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                              className={cn("h-full rounded-full", course.color)}
                            />
                        </div>
                     </div>
                   ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 rounded-[1rem] font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary h-10">
                   View Full Curriculum
                </Button>
             </Card>
          </div>

          <Card className="border-none shadow-sm rounded-[2rem] bg-card overflow-hidden">
             <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-black">Official Documents</CardTitle>
                <Button className="rounded-xl font-black h-9 text-[10px] uppercase tracking-widest">Upload File</Button>
             </CardHeader>
             <CardContent className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Identity_Verification.pdf", size: "2.4 MB", date: "Jan 12, 2024" },
                  { name: "Transcript_S1.pdf", size: "1.1 MB", date: "Dec 05, 2023" }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-muted/50 group hover:border-primary/50 transition-all">
                     <div className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <FileText size={24} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{doc.name}</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{doc.size} • {doc.date}</p>
                     </div>
                     <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                        <Download className="h-4 w-4" />
                     </Button>
                  </div>
                ))}
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
