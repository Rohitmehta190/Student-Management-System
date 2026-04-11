import { useState } from "react"
import { 
  BarChart3, 
  Search, 
  Download, 
  TrendingUp, 
  ArrowUpRight,
  Medal,
  BookOpen
} from "lucide-react"
import { motion } from "framer-motion"
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/services/api"

const gradeData = [
  { subject: "Physics", score: 85, average: 72 },
  { subject: "Chemistry", score: 92, average: 68 },
  { subject: "Math", score: 78, average: 75 },
  { subject: "English", score: 88, average: 80 },
  { subject: "History", score: 95, average: 70 },
  { subject: "CS", score: 90, average: 82 },
]

export default function ResultsPage() {
  const { data: recentResults, isLoading } = useQuery({
    queryKey: ['results'],
    queryFn: api.results.getRecent,
  })

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Results</h1>
          <p className="text-muted-foreground">Detailed performance analysis and grade management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-semibold border-2 h-11">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20 h-11 px-8">
            Publish Results
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-6">
             <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/20">
                  <Medal size={24} />
                </div>
                <Badge className="bg-white/20 text-white border-none font-bold">Top 5%</Badge>
             </div>
             <div className="mt-6">
                <p className="text-indigo-100 text-sm font-medium">Overall Pass Percentage</p>
                <div className="flex items-baseline gap-2 mt-1">
                   {isLoading ? <Skeleton className="h-8 w-16 bg-white/20" /> : <h3 className="text-3xl font-bold">94.2%</h3>}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-100/70">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>2.4% better than last semester</span>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl bg-card">
          <CardContent className="p-6">
             <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600">
                  <BarChart3 size={24} />
                </div>
             </div>
             <div className="mt-6">
                <p className="text-muted-foreground text-sm font-medium">Class Average GPA</p>
                <div className="flex items-baseline gap-2 mt-1">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : <h3 className="text-3xl font-bold">3.68</h3>}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>On track with Yearly Goal</span>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl bg-card">
          <CardContent className="p-6">
             <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600">
                  <BookOpen size={24} />
                </div>
             </div>
             <div className="mt-6">
                <p className="text-muted-foreground text-sm font-medium">Evaluations Completed</p>
                <div className="flex items-baseline gap-2 mt-1">
                   {isLoading ? <Skeleton className="h-8 w-16" /> : <h3 className="text-3xl font-bold">1,240</h3>}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>85% of total assessments</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Comparison between current class scores and institute average.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="subject" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 700 }}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px' }}
                />
                <Bar dataKey="score" name="Class Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="average" name="Average Score" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm rounded-3xl overflow-hidden bg-card">
          <CardHeader>
            <CardTitle>Latest Published Results</CardTitle>
            <CardDescription>Recently updated examination results.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                  [1,2,3,4].map(i => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-3xl bg-muted/20 border border-muted/20">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="space-y-2 flex flex-col items-end">
                        <Skeleton className="h-5 w-8" />
                        <Skeleton className="h-2 w-12" />
                      </div>
                    </div>
                  ))
              ) : (
                recentResults?.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 rounded-3xl bg-muted/30 border border-muted/50 transition-all hover:bg-muted/50 cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{result.student}</span>
                      <span className="text-xs text-muted-foreground">{result.course}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-primary">{result.grade}</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{result.percentage}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="ghost" className="w-full mt-6 rounded-xl font-bold text-muted-foreground hover:text-primary">
              View All Results History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
