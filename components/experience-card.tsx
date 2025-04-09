import { Calendar, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceCardProps {
  title: string
  company: string
  duration: string
  location: string
  description: string[]
  link?: string
  linkText?: string
}

export default function ExperienceCard({
  title,
  company,
  duration,
  location,
  description,
  link,
  linkText,
}: ExperienceCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 group">
      <CardHeader>
        <CardTitle className="flex items-start gap-2">
          <Briefcase className="h-5 w-5 mt-1 text-primary group-hover:scale-110 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="group-hover:text-primary transition-colors">{title}</span>
              {link && linkText && (
                <Link
                  href={link}
                  className="text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkText}
                </Link>
              )}
            </div>
            <div className="text-base font-normal text-muted-foreground">{company}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
        <ul className="space-y-2 list-disc pl-5">
          {description.map((item, index) => (
            <li key={index} className="text-sm group-hover:text-foreground/90 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
