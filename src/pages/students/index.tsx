import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2, UserPlus, FileSpreadsheet, Loader2
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/services/api"
import { studentSchema, StudentValues } from "@/lib/validations"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Data Fetching
  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: api.students.getAll
  })

  // Mutation for creating a student
  const { mutate: createStudent, isPending } = useMutation({
    mutationFn: api.students.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success("Student added successfully!", {
        description: "A new student profile has been created.",
      })
      setIsOpen(false)
      form.reset()
    },
    onError: () => {
      toast.error("Failed to add student", {
        description: "Please try again later.",
      })
    }
  })

  // Form setup
  const form = useForm<StudentValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      course: "",
      year: "",
      status: "Active",
    }
  })

  const onSubmit = (data: StudentValues) => {
    createStudent(data)
  }

  // Filter students
  const filteredStudents = students?.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground">Manage and track all students in your institution.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-bold">
            <FileSpreadsheet className="h-4 w-4" /> Bulk Import
          </Button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20" onClick={() => setIsOpen(true)}>
              <UserPlus className="h-4 w-4" /> Add Student
            </Button>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Register New Student</DialogTitle>
                <DialogDescription>Enter the personal and academic details of the student.</DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="rounded-xl h-11" {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl h-11" {...form.register("email")} />
                    {form.formState.errors.email && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Controller
                      name="course"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="rounded-xl h-11">
                            <SelectValue placeholder="Select Course" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mechanical Eng">Mechanical Eng</SelectItem>
                            <SelectItem value="Business Admin">Business Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.course && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.course.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Controller
                      name="year"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="rounded-xl h-11">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.year && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.year.message}</p>
                    )}
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isPending} className="rounded-xl px-8 font-bold">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Register Student
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID or email..." 
                className="pl-10 h-11 rounded-xl bg-muted/30 border-none px-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg gap-2 h-9">
                <Filter className="h-3.5 w-3.5" /> Filters
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg gap-2 h-9">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-muted/60 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                   [1,2,3,4,5].map(i => (
                     <TableRow key={i}>
                       <TableCell><Skeleton className="h-10 w-48 rounded-xl" /></TableCell>
                       <TableCell><Skeleton className="h-5 w-24 rounded-lg" /></TableCell>
                       <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                       <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                       <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                       <TableCell><Skeleton className="h-8 w-8 rounded-lg ml-auto" /></TableCell>
                     </TableRow>
                   ))
                ) : filteredStudents?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-medium">
                      No students found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents?.map((student) => (
                    <TableRow 
                      key={student.id} 
                      className="hover:bg-muted/30 transition-colors border-muted/50 cursor-pointer group/row"
                      onClick={() => navigate("/students/profile")}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border shadow-sm">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">{student.name}</span>
                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">{student.id}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">{student.course}</TableCell>
                      <TableCell className="text-sm font-medium">{student.year}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                             <div 
                               className={cn(
                                 "h-full rounded-full transition-all",
                                 parseInt(student.attendance) > 90 ? "bg-green-500" : parseInt(student.attendance) > 80 ? "bg-blue-500" : "bg-orange-500"
                               )} 
                               style={{ width: student.attendance }} 
                             />
                           </div>
                           <span className="text-xs font-black">{student.attendance}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "rounded-lg px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider",
                            student.status === "Active" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                            student.status === "On Leave" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                            student.status === "Probation" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          )}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger {...({ asChild: true } as any)} onClick={(e: any) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
                              <Edit className="h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="rounded-xl gap-2 cursor-pointer text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                toast.error("Student deleted", { description: "Data has been moved to archives." })
                              }}
                            >
                              <Trash2 className="h-4 w-4" /> Delete Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Showing <span className="font-black text-foreground">1-{filteredStudents?.length || 0}</span> students
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg h-9 px-4 font-bold" disabled>Prev</Button>
              <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0 bg-primary text-primary-foreground font-black">1</Button>
              <Button variant="outline" size="sm" className="rounded-lg h-9 px-4 font-bold">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
