
import { AppSidebar } from "../components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/input"
import { Separator } from "../components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { Search } from "lucide-react"

export default function Dashboard({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 ">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-6" />
            
          </div>
          <Avatar>
            <AvatarImage src="https://img.icons8.com/?size=100&id=23242&format=png&color=000000" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}






