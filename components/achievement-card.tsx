import { Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AchievementCardProps {
  title: string
  items: string[]
}

export default function AchievementCard({ title, items }: AchievementCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" />
          <span className="group-hover:text-primary transition-colors">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          {items.map((item, index) => (
            <li key={index} className="text-sm group-hover:text-foreground/90 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
