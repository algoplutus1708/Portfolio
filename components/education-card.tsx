import { Calendar, MapPin, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EducationCardProps {
  institution: string
  degree: string
  duration: string
  location: string
  gpa?: string
}

export default function EducationCard({ institution, degree, duration, location, gpa }: EducationCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 group">
      <CardHeader>
        <CardTitle className="flex items-start gap-2">
          <GraduationCap className="h-5 w-5 mt-1 text-primary group-hover:scale-110 transition-transform" />
          <div>
            <div className="group-hover:text-primary transition-colors">{institution}</div>
            <div className="text-base font-normal text-muted-foreground">{degree}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
          <Calendar className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        {gpa && (
          <div className="text-sm font-medium mt-2 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
            {gpa}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
