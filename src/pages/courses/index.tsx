import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Search, 
  Users, 
  Clock, 
  Bookmark,
  ChevronRight,
  BookPlus,
  Image as ImageIcon,
  Loader2
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/services/api"
import { courseSchema, CourseValues } from "@/lib/validations"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Data Fetching
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: api.courses.getAll
  })

  // Mutation
  const { mutate: createCourse, isPending } = useMutation({
    mutationFn: api.courses.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success("Course Created", {
        description: "The new curriculum has been added to the academic catalog.",
      })
      setIsModalOpen(false)
      form.reset()
    },
    onError: () => {
      toast.error("Failed to create course", {
        description: "Please try again later.",
      })
    }
  })

  // Form setup
  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      code: "",
      duration: "",
      instructor: "",
      category: "General",
      image: "",
    }
  })

  const onSubmit = (data: CourseValues) => {
    createCourse(data)
  }

  const filteredCourses = courses?.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
          <p className="text-muted-foreground">Manage and monitor academic courses and curriculum.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 font-black h-11 px-6" onClick={() => setIsModalOpen(true)}>
            <BookPlus className="h-4 w-4" /> Create Course
          </Button>
          <DialogContent className="sm:max-w-[550px] rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Launch New Course</DialogTitle>
              <DialogDescription>Design and publish a new academic program.</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="c-title">Course Title</Label>
                <Input id="c-title" placeholder="e.g. Advanced Machine Learning" className="rounded-xl h-11 border-2" {...form.register("title")} />
                {form.formState.errors.title && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.title.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="c-code">Subject Code</Label>
                  <Input id="c-code" placeholder="CS501" className="rounded-xl h-11 border-2" {...form.register("code")} />
                  {form.formState.errors.code && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.code.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-duration">Duration</Label>
                  <Input id="c-duration" placeholder="12 Weeks" className="rounded-xl h-11 border-2" {...form.register("duration")} />
                  {form.formState.errors.duration && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.duration.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="c-instructor">Assign Instructor</Label>
                  <Input id="c-instructor" placeholder="Prof. Jane Doe" className="rounded-xl h-11 border-2" {...form.register("instructor")} />
                  {form.formState.errors.instructor && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.instructor.message}</p>
                  )}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="c-category">Category</Label>
                  <Input id="c-category" placeholder="Tech / Science / Arts" className="rounded-xl h-11 border-2" {...form.register("category")} />
                  {form.formState.errors.category && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.category.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 cursor-pointer hover:bg-muted/50 transition-colors relative">
                 <ImageIcon className="text-muted-foreground" />
                 <span className="text-sm font-bold text-muted-foreground">Upload Featured Image (Or paste URL)</span>
                 <Input 
                   type="url" 
                   className="absolute inset-0 opacity-0 cursor-pointer" 
                   title="Paste Image URL"
                   {...form.register("image")}
                 />
              </div>
              <DialogFooter className="pt-4 grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="rounded-xl h-11 font-bold" onClick={() => setIsModalOpen(false)}>Discard</Button>
                <Button type="submit" disabled={isPending} className="rounded-xl h-11 font-black shadow-lg shadow-primary/10">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Publish Course
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
            placeholder="Search by title, code or instructor..." 
            className="pl-10 h-11 rounded-2xl bg-card border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
           <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted rounded-xl font-bold bg-card border-none shadow-sm">All Courses</Badge>
           <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted rounded-xl font-bold">Science</Badge>
           <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted rounded-xl font-bold">Tech</Badge>
           <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted rounded-xl font-bold">Commerce</Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
         {isLoading ? (
             [1,2,3].map(i => (
               <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-card overflow-hidden">
                 <Skeleton className="w-full aspect-[16/10] rounded-none" />
                 <CardContent className="pt-8 space-y-6">
                    <div className="flex justify-between">
                       <Skeleton className="h-6 w-24" />
                       <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <div className="flex gap-4 pt-4">
                       <Skeleton className="h-10 w-10 rounded-2xl" />
                       <div className="space-y-2">
                         <Skeleton className="h-3 w-16" />
                         <Skeleton className="h-5 w-32" />
                       </div>
                    </div>
                 </CardContent>
                 <CardFooter className="bg-muted/10 px-8 py-6">
                    <Skeleton className="h-12 w-full rounded-[1.25rem]" />
                 </CardFooter>
               </Card>
             ))
         ) : filteredCourses?.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground font-medium">
              No courses found matching your criteria.
            </div>
         ) : (
          filteredCourses?.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden group bg-card">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Badge className="absolute top-6 left-6 rounded-xl bg-white/20 backdrop-blur-xl border-white/20 text-white font-black h-8 px-3 uppercase text-[10px] tracking-widest">
                    {course.id}
                  </Badge>
                  <Button variant="ghost" size="icon" className="absolute top-6 right-6 rounded-2xl bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 border-none transition-transform hover:rotate-12">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-black text-xl leading-tight line-clamp-2 drop-shadow-lg">{course.title}</h3>
                  </div>
                </div>

                <CardContent className="pt-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-blue-500/10">
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="font-black text-xs uppercase tracking-tighter">{course.students} Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Clock className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="font-black text-xs uppercase tracking-tighter">{course.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Curriculum Completion</span>
                      <span className="text-sm font-black text-primary">{course.progress}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-muted/50">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xs shadow-lg">
                      {course.instructor.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Lead Instructor</span>
                      <span className="text-sm font-black tracking-tight">{course.instructor}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 bg-muted/10 px-8 py-6">
                  <Button 
                    onClick={() => navigate("/courses/detail")}
                    className="w-full rounded-[1.25rem] gap-3 font-black text-xs uppercase tracking-[0.15em] h-12 shadow-xl shadow-primary/5 transition-all hover:scale-[1.02] active:scale-95 group/btn"
                  >
                    Manage Academy
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
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
