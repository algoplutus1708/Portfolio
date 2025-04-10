import { cn } from "@/lib/utils"

interface BadgeProps {
  name: string
  className?: string
}

export default function Badge({ name, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        className,
      )}
    >
      {name}
    </span>
  )
}
