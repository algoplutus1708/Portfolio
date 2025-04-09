import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}

export default function ProjectCard({ title, description, image, tags, demoUrl, codeUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/80 text-white hover:bg-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="rounded-full flex-1 group/btn">
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <ExternalLink className="mr-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            Demo
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="rounded-full flex-1 group/btn">
          <Link href={codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <Github className="mr-1 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
