import { useLocation, Link } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
      <Link 
        to="/" 
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
      >
        <Home size={12} strokeWidth={3} />
        <span>Main</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join("/")}`

        return (
          <div key={to} className="flex items-center space-x-2">
            <ChevronRight size={10} strokeWidth={3} className="text-muted-foreground/30" />
            <Link
              to={to}
              className={last ? "text-primary cursor-default" : "hover:text-primary transition-colors"}
            >
              {value.replace("-", " ")}
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
