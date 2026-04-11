import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Calendar, 
  BookOpen, 
  FileText, 
  Video, 
  CheckCircle2, 
  ChevronRight,
  ChevronDown,
  Download,
  MoreVertical,
  Play,
  GraduationCap
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const syllabus = [
  { 
    title: "Introduction to Quantum Mechanics", 
    duration: "2 Weeks", 
    lessons: [
      { name: "Wave-Particle Duality", type: "video", duration: "45m", completed: true },
      { name: "The Schrödinger Equation", type: "reading", duration: "1.5h", completed: true },
    ]
  },
  { 
    title: "Mathematical Foundations", 
    duration: "3 Weeks", 
    lessons: [
      { name: "Hilbert Spaces", type: "video", duration: "55m", completed: true },
      { name: "Linear Operators", type: "reading", duration: "2h", completed: false },
      { name: "Weekly Quiz 1", type: "quiz", duration: "20m", completed: false },
    ]
  },
  { 
    title: "Quantum States & Operators", 
    duration: "4 Weeks", 
    lessons: [
      { name: "Dirac Notation", type: "video", duration: "1h", completed: false },
      { name: "Measurement & Observables", type: "reading", duration: "3h", completed: false },
    ]
  }
]

export default function CourseDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/courses")} 
          className="rounded-xl h-10 w-10 border bg-background shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Advanced Quantum Physics</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Catalog</span>
            <span>/</span>
            <span className="text-primary">PHY401</span>
          </nav>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Syllabus & Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80" 
               className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105" 
               alt="Course Preview"
             />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="h-20 w-20 rounded-full bg-white text-primary shadow-2xl group/play">
                   <Play className="fill-current ml-1 transition-transform group-hover/play:scale-110" />
                </Button>
             </div>
             <div className="absolute top-8 left-8">
               <Badge className="bg-white/20 backdrop-blur-xl text-white border-white/20 font-black h-8 px-4 rounded-xl">Next Up: Hilbert Spaces</Badge>
             </div>
          </div>

          <Tabs defaultValue="curriculum" className="space-y-6">
            <TabsList className="bg-muted/50 p-1 rounded-2xl h-14 border shadow-sm">
               <TabsTrigger value="curriculum" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Curriculum</TabsTrigger>
               <TabsTrigger value="resources" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Resources</TabsTrigger>
               <TabsTrigger value="discussion" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
               {syllabus.map((module, i) => (
                 <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden bg-card">
                   <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted/10 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs">
                            {String(i + 1).padStart(2, '0')}
                         </div>
                         <div>
                            <h3 className="font-black tracking-tight">{module.title}</h3>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground/60">{module.duration} • {module.lessons.length} Lessons</p>
                         </div>
                      </div>
                      <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                         <ChevronDown size={18} />
                      </div>
                   </div>
                   <div className="px-6 pb-6 pt-0 space-y-3">
                      {module.lessons.map((lesson, li) => (
                        <div key={li} className="flex items-center justify-between p-3 rounded-2xl bg-muted/20 border border-muted/20 group hover:border-primary/30 transition-all cursor-pointer">
                           <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                                lesson.completed ? "bg-green-500 text-white" : "bg-white dark:bg-zinc-800 text-muted-foreground group-hover:text-primary"
                              )}>
                                 {lesson.completed ? <CheckCircle2 size={16} /> : lesson.type === "video" ? <Video size={16} /> : <FileText size={16} />}
                              </div>
                              <span className={cn("text-xs font-bold", lesson.completed && "text-muted-foreground line-through opacity-70")}>{lesson.name}</span>
                           </div>
                           <span className="text-[10px] font-black text-muted-foreground/50 uppercase">{lesson.duration}</span>
                        </div>
                      ))}
                   </div>
                 </Card>
               ))}
            </TabsContent>
            
            <TabsContent value="resources">
               <Card className="border-none shadow-sm rounded-3xl bg-card p-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-muted">
                  <BookOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-sm font-bold text-muted-foreground/60">Upload course materials, slide decks, and reference papers here.</p>
               </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Instructor & Enrolled Students */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none shadow-sm rounded-[2.5rem] bg-card p-8">
              <CardTitle className="text-xl font-black mb-6">Instructor</CardTitle>
              <div className="flex flex-col items-center text-center space-y-4">
                 <Avatar className="h-24 w-24 border-4 border-muted/20 ring-2 ring-background shadow-xl">
                   <AvatarImage src="https://i.pravatar.cc/150?u=11" />
                   <AvatarFallback className="text-xl font-black">SM</AvatarFallback>
                 </Avatar>
                 <div>
                    <h3 className="text-lg font-black tracking-tight">Dr. Sarah Miller</h3>
                    <p className="text-[10px] uppercase font-bold text-primary tracking-widest underline decoration-2 underline-offset-4">Department of Physics</p>
                 </div>
                 <p className="text-xs font-medium text-muted-foreground/80 leading-relaxed">Expert in Quantum Field Theory and Theoretical Mechanics with over 15 years of research experience.</p>
                 <div className="flex gap-2 w-full pt-2">
                    <Button variant="outline" className="flex-1 rounded-2xl h-11 font-black text-xs uppercase tracking-widest border-2">Message</Button>
                    <Button className="flex-1 rounded-2xl h-11 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">Profile</Button>
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-sm rounded-[2.5rem] bg-card p-8">
              <div className="flex items-center justify-between mb-6">
                 <CardTitle className="text-xl font-black">Top Performers</CardTitle>
                 <Badge variant="ghost" className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">Enrolled: 120</Badge>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "Alice Johnson", gpa: "4.0", avatar: "AJ" },
                   { name: "Michael Chen", gpa: "3.9", avatar: "MC" },
                   { name: "Sarah Jenkins", gpa: "3.9", avatar: "SJ" },
                   { name: "David Ross", gpa: "3.8", avatar: "DR" }
                 ].map((std, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10 border-2 border-background shadow-sm hover:scale-110 transition-transform cursor-pointer">
                            <AvatarFallback className="text-[10px] font-black">{std.avatar}</AvatarFallback>
                         </Avatar>
                         <span className="text-sm font-bold tracking-tight">{std.name}</span>
                      </div>
                      <Badge className="bg-primary/5 text-primary border-none rounded-lg font-black">GPA: {std.gpa}</Badge>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full mt-2 rounded-[1rem] font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary h-12 border-2 border-transparent hover:border-muted/30">
                    View Complete Class Roster
                 </Button>
              </div>
           </Card>

           <Card className="border-none shadow-sm rounded-[2.5rem] bg-indigo-600 p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-125 duration-700">
                 <GraduationCap size={160} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <h3 className="text-xl font-black mb-1">Final Exam</h3>
                    <p className="text-indigo-100/60 text-xs font-medium uppercase tracking-widest">Mark your calendar</p>
                 </div>
                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl border border-white/20">
                    <div className="h-12 w-12 rounded-2xl bg-white text-indigo-600 flex flex-col items-center justify-center shadow-lg">
                       <span className="text-lg font-black leading-none">24</span>
                       <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">MAY</span>
                    </div>
                    <div>
                       <p className="text-sm font-black">Room 402B • 10:00 AM</p>
                       <p className="text-[10px] text-indigo-100/70 font-bold uppercase tracking-tighter">Bring your calculator</p>
                    </div>
                 </div>
                 <Button className="w-full bg-white text-indigo-700 hover:bg-white/90 font-black rounded-2xl h-11 shadow-2xl">
                    Register for Exam
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
