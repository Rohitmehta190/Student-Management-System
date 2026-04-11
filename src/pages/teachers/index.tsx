import { useState } from "react"
import { 
  Search, 
  BookOpen, 
  Calendar,
  MessageSquare,
  ExternalLink,
  UserPlus,
  Loader2,
  MoreVertical,
  Mail,
  Phone
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/services/api"
import { teacherSchema, TeacherValues } from "@/lib/validations"

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  // Data Fetching
  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: api.teachers.getAll
  })

  // Mutation
  const { mutate: createTeacher, isPending } = useMutation({
    mutationFn: api.teachers.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success("Faculty member added!", {
        description: "A secure profile and email have been provisioned.",
      })
      setIsOpen(false)
      form.reset()
    },
    onError: () => {
      toast.error("Failed to add teacher", {
        description: "Please try again later.",
      })
    }
  })

  // Form setup
  const form = useForm<TeacherValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      experience: "",
      avatar: "",
    }
  })

  const onSubmit = (data: TeacherValues) => {
    createTeacher(data)
  }

  const filteredTeachers = teachers?.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Directory</h1>
          <p className="text-muted-foreground">Manage professors and teaching staff members.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 font-bold" onClick={() => setIsOpen(true)}>
            <UserPlus className="h-4 w-4" /> Add Teacher
          </Button>
          <DialogContent className="sm:max-w-[500px] rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add Faculty Member</DialogTitle>
              <DialogDescription>Onboard a new educator to your institution.</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="t-name">Full Name</Label>
                  <Input id="t-name" placeholder="Dr. Jane Smith" className="rounded-xl h-11" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="t-subject">Primary Subject</Label>
                  <Input id="t-subject" placeholder="Physics" className="rounded-xl h-11" {...form.register("subject")} />
                  {form.formState.errors.subject && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.subject.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-email">Official Email</Label>
                <Input id="t-email" type="email" placeholder="jane@nexus.edu" className="rounded-xl h-11" {...form.register("email")} />
                {form.formState.errors.email && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="t-exp">Experience</Label>
                  <Input id="t-exp" placeholder="5 Years" className="rounded-xl h-11" {...form.register("experience")} />
                  {form.formState.errors.experience && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.experience.message}</p>
                  )}
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isPending} className="rounded-xl px-8 font-bold">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Complete Onboarding
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by name or subject..." 
            className="pl-10 h-11 rounded-2xl bg-card border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-muted rounded-xl font-bold bg-card border-none shadow-sm">All Staff</Badge>
           <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-muted rounded-xl font-bold">Science</Badge>
           <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-muted rounded-xl font-bold">Arts</Badge>
           <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-muted rounded-xl font-bold">Commerce</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
           [1,2,3,4,5,6].map(i => (
             <Card key={i} className="border-none shadow-sm rounded-3xl bg-card">
               <CardHeader className="flex flex-row gap-4 pb-4">
                 <Skeleton className="h-16 w-16 rounded-full" />
                 <div className="space-y-2 flex-1">
                   <Skeleton className="h-5 w-3/4" />
                   <Skeleton className="h-3 w-1/2" />
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <Skeleton className="h-8 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
               </CardContent>
               <CardFooter>
                 <Skeleton className="h-10 w-full rounded-2xl" />
               </CardFooter>
             </Card>
           ))
        ) : filteredTeachers?.length === 0 ? (
           <div className="col-span-full py-12 text-center text-muted-foreground font-medium">
             No faculty members found.
           </div>
        ) : (
          filteredTeachers?.map((teacher, i) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group bg-card">
                <CardHeader className="pb-4 relative">
                  <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-4 border-muted/20 ring-2 ring-background">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-2 border-background rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg font-black tracking-tight">{teacher.name}</CardTitle>
                      <CardDescription className="font-bold text-primary/70 uppercase text-[10px] tracking-widest">{teacher.subject}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 font-black">
                    <div className="flex items-center gap-2 text-[10px] uppercase text-muted-foreground p-2 rounded-xl bg-muted/30">
                      <Calendar className="h-3 w-3 text-indigo-500" />
                      <span>{teacher.experience} Exp</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase text-muted-foreground p-2 rounded-xl bg-muted/30">
                      <BookOpen className="h-3 w-3 text-purple-500" />
                      <span>{teacher.classes} Classes</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate font-medium">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">+1 234 567 890</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 flex items-center gap-3 px-6">
                  <Button variant="outline" className="flex-1 rounded-2xl gap-2 text-xs h-10 font-black border-2">
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                   <Button className="flex-1 rounded-2xl gap-2 text-xs h-10 font-black shadow-lg shadow-primary/10">
                    <ExternalLink className="h-4 w-4" /> Profile
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
