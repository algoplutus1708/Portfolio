import { Card, CardContent } from "@/components/ui/card"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Card className="border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-md hover:shadow-primary/10 group hover:-translate-y-1">
      <CardContent className="flex items-center justify-center p-4">
        <span className="font-medium group-hover:text-primary transition-colors">{name}</span>
      </CardContent>
    </Card>
  )
}
