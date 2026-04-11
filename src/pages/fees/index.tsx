import { useState } from "react"
import {
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  History,
  Search,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Receipt,
  Eye,
  Send,
  Printer
} from "lucide-react"
import { motion } from "framer-motion"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const feeHistory = [
  { id: "INV-2024-001", student: "Alice Johnson", amount: "$1,200", date: "Apr 05, 2024", status: "Paid", method: "Credit Card" },
  { id: "INV-2024-002", student: "Bob Smith", amount: "$850", date: "Apr 04, 2024", status: "Pending", method: "Bank Transfer" },
  { id: "INV-2024-003", student: "Charlie Davis", amount: "$2,400", date: "Apr 02, 2024", status: "Paid", method: "PayPal" },
  { id: "INV-2024-004", student: "Ethan Hunt", amount: "$1,500", date: "Mar 28, 2024", status: "Overdue", method: "Credit Card" },
  { id: "INV-2024-005", student: "Sarah Jenkins", amount: "$900", date: "Mar 15, 2024", status: "Paid", method: "Cash" },
]

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

export default function FeesPage() {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false)

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Invoice Generated", {
      description: "Receipt #INV-2024-102 has been sent to the student's email.",
    })
    setIsInvoiceOpen(false)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-muted-foreground">Manage student fees, invoices, and institutional revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-bold h-11 border-2">
            <Download className="h-4 w-4" /> Export Ledger
          </Button>

          <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
            <Button className="rounded-xl gap-2 font-black h-11 shadow-lg shadow-primary/20 px-6" onClick={() => setIsInvoiceOpen(true)}>
              <Receipt className="h-4 w-4" /> Generate Invoice
            </Button>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Billing & Invoicing</DialogTitle>
                <DialogDescription>Create a new fee entry or student invoice.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleGenerateInvoice} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="i-student">Select Student</Label>
                  <Input id="i-student" placeholder="Alice Johnson (ST001)" className="rounded-xl h-11" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="i-amount">Amount ($)</Label>
                    <Input id="i-amount" type="number" placeholder="1200" className="rounded-xl h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="i-type">Fee Category</Label>
                    <Input id="i-type" placeholder="Tuition Fee" className="rounded-xl h-11" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i-note">Notes (Optional)</Label>
                  <Input id="i-note" placeholder="Semester 2 enrollment fees" className="rounded-xl h-11" />
                </div>
                <DialogFooter className="pt-4 grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="rounded-xl h-11 font-bold" onClick={() => setIsInvoiceOpen(false)}>Discard</Button>
                  <Button type="submit" className="rounded-xl h-11 font-black shadow-lg shadow-primary/10">Submit Invoice</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: "$424,500", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10", change: "+12%" },
          { label: "Pending Dues", value: "$42,800", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", change: "12 Students" },
          { label: "Overdue Accounts", value: "18", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10", change: "High Risk" },
          { label: "Monthly Target", value: "82%", icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-500/10", change: "On Track" },
        ].map((stat, i) => (
          <Card key={i} className={cn("border-none shadow-sm rounded-3xl bg-card transition-all hover:shadow-md", i === 3 && "bg-primary text-primary-foreground")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-2xl", i === 3 ? "bg-white/20" : stat.bg, i === 3 ? "text-white" : stat.color)}>
                  <stat.icon size={24} />
                </div>
                <Badge variant="secondary" className={cn("text-[10px] uppercase font-black tracking-widest border-none", i === 3 ? "bg-white/20 text-white" : "bg-muted")}>
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-6">
                <p className={cn("text-sm font-bold uppercase tracking-widest", i === 3 ? "text-white/60" : "text-muted-foreground")}>{stat.label}</p>
                <h3 className="text-3xl font-black mt-1 tracking-tighter">{stat.value}</h3>
                {i === 3 && (
                  <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-black">Revenue Analytics</CardTitle>
            <CardDescription className="font-medium">Monthly collection trends vs forecast.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pl-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 900 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            <CardDescription className="font-medium text-xs uppercase tracking-widest text-primary/60">Manage pending transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeHistory.slice(0, 4).map((tx) => (
                <div key={tx.id} className="group p-4 rounded-3xl bg-muted/20 border border-muted/20 transition-all hover:bg-muted/40 cursor-pointer flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-background border flex items-center justify-center shadow-sm">
                        <ArrowDownRight className={cn("h-5 w-5", tx.status === "Paid" ? "text-green-500" : "text-orange-500")} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black tracking-tight">{tx.student}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{tx.id}</span>
                      </div>
                    </div>
                    <span className="text-sm font-black">{tx.amount}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl bg-background border hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl bg-background border hover:text-primary">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge className={cn(
                      "text-[10px] h-6 rounded-lg px-3 font-black uppercase tracking-widest border-none",
                      tx.status === "Paid" ? "bg-green-100 text-green-700 dark:bg-green-900/40" : "bg-orange-100 text-orange-700 dark:bg-orange-900/40"
                    )}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest text-muted-foreground hover:text-primary h-12">
              View All Financial Records
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
