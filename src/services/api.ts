import { StudentValues, TeacherValues, CourseValues } from "../lib/validations"

// Utility to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let studentsMock = [
  { id: "ST001", name: "Alice Johnson", email: "alice.j@example.com", course: "Computer Science", year: "3rd Year", status: "Active", attendance: "98%", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "ST002", name: "Bob Smith", email: "bob.s@example.com", course: "Mechanical Eng", year: "2nd Year", status: "On Leave", attendance: "85%", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "ST003", name: "Charlie Davis", email: "charlie.d@example.com", course: "Business Admin", year: "1st Year", status: "Active", attendance: "92%", avatar: "https://i.pravatar.cc/150?u=3" },
]

let teachersMock = [
  { id: "T001", name: "Dr. Sarah Jenkins", email: "sarah.j@example.com", subject: "Quantum Physics", department: "Science", status: "Active", avatar: "https://i.pravatar.cc/150?u=7", classes: 4, experience: "15 Years" },
  { id: "T002", name: "Prof. Michael Chen", email: "m.chen@example.com", subject: "Data Structures", department: "Computer Science", status: "Active", avatar: "https://i.pravatar.cc/150?u=8", classes: 3, experience: "8 Years" },
  { id: "T003", name: "Dr. Emily Brown", email: "e.brown@example.com", subject: "World History", department: "Arts", status: "On Leave", avatar: "https://i.pravatar.cc/150?u=9", classes: 0, experience: "12 Years" },
]

let coursesMock = [
  { id: "CS101", title: "Introduction to Programming", instructor: "Prof. Michael Chen", students: 120, duration: "16 Weeks", status: "Active", progress: 65, color: "bg-blue-500", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
  { id: "BA201", title: "Business Ethics", instructor: "Dr. Robert Wilson", students: 85, duration: "12 Weeks", status: "Upcoming", progress: 0, color: "bg-purple-500", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { id: "PH301", title: "Quantum Physics", instructor: "Dr. Sarah Jenkins", students: 45, duration: "16 Weeks", status: "Active", progress: 82, color: "bg-indigo-500", image: "https://images.unsplash.com/photo-1636466497217-26c8c60baa4b?w=800&q=80" },
]

let attendanceMock = [
  { id: "ST001", name: "Alice Johnson", status: "Present", time: "08:45 AM", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "ST002", name: "Bob Smith", status: "Absent", time: "-", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "ST003", name: "Charlie Davis", status: "Present", time: "08:55 AM", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "ST004", name: "Diana Prince", status: "Late", time: "09:15 AM", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "ST005", name: "Ethan Hunt", status: "Present", time: "08:30 AM", avatar: "https://i.pravatar.cc/150?u=5" },
]

let feeHistoryMock = [
  { id: "INV-2024-001", student: "Alice Johnson", amount: "$1,200", date: "Apr 05, 2024", status: "Paid", method: "Credit Card" },
  { id: "INV-2024-002", student: "Bob Smith", amount: "$850", date: "Apr 04, 2024", status: "Pending", method: "Bank Transfer" },
  { id: "INV-2024-003", student: "Charlie Davis", amount: "$2,400", date: "Apr 02, 2024", status: "Paid", method: "PayPal" },
  { id: "INV-2024-004", student: "Ethan Hunt", amount: "$1,500", date: "Mar 28, 2024", status: "Overdue", method: "Credit Card" },
  { id: "INV-2024-005", student: "Sarah Jenkins", amount: "$900", date: "Mar 15, 2024", status: "Paid", method: "Cash" },
]

let resultsMock = [
  { id: 1, student: "Alice Johnson", course: "Advanced Physics", grade: "A+", percentage: "98%", status: "Passed" },
  { id: 2, student: "Bob Smith", course: "Organic Chemistry", grade: "B", percentage: "82%", status: "Passed" },
  { id: 3, student: "Charlie Davis", course: "Mathematics II", grade: "C+", percentage: "75%", status: "Passed" },
  { id: 4, student: "Ethan Hunt", course: "Cyber Security", grade: "A", percentage: "94%", status: "Passed" },
]

export const api = {
  students: {
    getAll: async () => {
      await delay(800)
      return studentsMock
    },
    create: async (data: StudentValues) => {
      await delay(1000)
      const newStudent = { ...data, id: `ST00${studentsMock.length + 1}`, attendance: data.attendance || "100%", avatar: data.avatar || `https://i.pravatar.cc/150?u=st${Date.now()}` }
      studentsMock = [newStudent, ...studentsMock]
      return newStudent
    }
  },
  teachers: {
    getAll: async () => {
      await delay(800)
      return teachersMock
    },
    create: async (data: TeacherValues) => {
      await delay(1000)
      const newTeacher = { ...data, id: `T00${teachersMock.length + 1}`, department: "General", classes: 0, status: "Active", avatar: data.avatar || `https://i.pravatar.cc/150?u=t${Date.now()}` }
      teachersMock = [newTeacher, ...teachersMock]
      return newTeacher
    }
  },
  courses: {
    getAll: async () => {
      await delay(800)
      return coursesMock
    },
    create: async (data: CourseValues) => {
      await delay(1000)
      const newCourse = { id: data.code, title: data.title, instructor: data.instructor, students: 0, duration: data.duration, status: "Upcoming", progress: 0, color: "bg-blue-500", image: data.image || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" }
      coursesMock = [newCourse, ...coursesMock]
      return newCourse
    }
  },
  attendance: {
    getToday: async () => {
      await delay(700)
      return attendanceMock
    },
    updateStatus: async ({ id, status }: { id: string, status: string }) => {
      await delay(400)
      attendanceMock = attendanceMock.map(student => 
        student.id === id ? { ...student, status } : student
      )
      return attendanceMock.find(s => s.id === id)
    }
  },
  financials: {
    getInvoices: async () => {
      await delay(800)
      return feeHistoryMock
    },
    createInvoice: async (data: any) => {
      await delay(1000)
      const newInvoice = { id: `INV-2024-00${feeHistoryMock.length + 1}`, student: data.student, amount: `$${data.amount}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), status: "Pending", method: "-" }
      feeHistoryMock = [newInvoice, ...feeHistoryMock]
      return newInvoice
    }
  },
  results: {
    getRecent: async () => {
      await delay(800)
      return resultsMock
    }
  },
  stats: {
    getDashboard: async () => {
      await delay(600)
      return { totalStudents: 2453, totalTeachers: 142, activeCourses: 85, avgAttendance: 94.2 }
    }
  }
}
