import { useState } from "react"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Lock, 
  Camera, 
  Mail, 
  Smartphone,
  LogOut,
  ChevronRight
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card p-1 rounded-2xl h-11 shadow-sm border">
          <TabsTrigger value="profile" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Security</TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-card">
            <CardHeader className="pb-4">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details and public information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                 <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-muted/50">
                       <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                       <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg border-2 border-background">
                       <Camera className="h-4 w-4" />
                    </Button>
                 </div>
                 <div className="space-y-1 flex-1">
                    <h3 className="text-xl font-bold">Dr. Rajesh Kumar</h3>
                    <p className="text-sm text-muted-foreground">Senior Administrator & Head of CS Faculty</p>
                    <div className="flex items-center gap-4 mt-2">
                       <Button variant="outline" size="sm" className="rounded-xl font-bold">Change Avatar</Button>
                       <Button variant="ghost" size="sm" className="rounded-xl font-bold text-destructive hover:bg-destructive/10">Remove Photo</Button>
                    </div>
                 </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Rajesh" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Kumar" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="rajesh.k@nexus.edu" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 234 567 890" className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                   id="bio"
                   className="w-full min-h-[120px] p-4 rounded-xl border bg-card text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                   defaultValue="Passionate educator and administrator with over 15 years of experience in higher education management."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-8 py-4 flex justify-end gap-3">
               <Button variant="outline" className="rounded-xl font-bold">Discard Changes</Button>
               <Button className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-card">
            <CardHeader>
               <CardTitle>Email Notifications</CardTitle>
               <CardDescription>Control which emails you receive about your institution activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { title: "New Enrollment", desc: "Notify when a new student enrolls in your courses.", icon: User },
                 { title: "Exam Results", desc: "Get notified when grades are published for your faculty.", icon: Bell },
                 { title: "Fee Payments", desc: "Weekly summary of total fee collections and pending dues.", icon: Lock },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-muted/50 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="p-3 rounded-2xl bg-background border shadow-sm">
                          <item.icon size={20} className="text-primary" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                       </div>
                    </div>
                    <Switch defaultChecked />
                 </div>
               ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <Card className="border-none shadow-sm rounded-3xl bg-card">
            <CardHeader>
               <CardTitle>Security & Privacy</CardTitle>
               <CardDescription>Protect your account with modern security standards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-indigo-500 text-white">
                           <Shield size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-indigo-900">Two-Factor Authentication</span>
                           <span className="text-xs text-indigo-700/70">Secure your account with 2FA verification.</span>
                        </div>
                     </div>
                     <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold">Enable Now</Button>
                  </div>

                  <div className="grid gap-6 px-2 py-4">
                     <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">App Access Logs</span>
                           <span className="text-xs text-muted-foreground">Monitor all logins to your dashboard.</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">Password Last Changed</span>
                           <span className="text-xs text-muted-foreground">3 months ago.</span>
                        </div>
                        <Button variant="link" className="text-xs font-bold p-0 h-auto">Update Password</Button>
                     </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-center pt-6">
         <Button variant="ghost" className="rounded-xl font-bold text-destructive gap-2 hover:bg-destructive/5">
            <LogOut size={18} /> Sign Out of All Sessions
         </Button>
      </div>
    </div>
  )
}
