import { Github, Linkedin, Mail, MapPin, Code, Menu, ArrowRight, Download, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ExperienceCard from "@/components/experience-card"
import AchievementCard from "@/components/achievement-card"
import EducationCard from "@/components/education-card"
import ContactForm from "@/components/contact-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedBlob } from "@/components/ui/animated-blob"
import { AnimatedWave } from "@/components/ui/animated-wave"
import { AnimatedParticles } from "@/components/ui/animated-particles"
import { AnimatedCode } from "@/components/ui/animated-code"
import { AnimatedTechStack } from "@/components/ui/animated-tech-stack"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { AnimatedTerminal } from "@/components/ui/animated-terminal"
import { AnimatedDeveloper } from "@/components/ui/animated-developer"
import { AnimatedTechIcons } from "@/components/ui/animated-tech-icons"
import { AnimatedCodeTyping } from "@/components/ui/animated-code-typing"
import { AnimatedRocket } from "@/components/ui/animated-rocket"
import { AnimatedCircuit } from "@/components/ui/animated-circuit"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-gradient text-2xl">
            <Link href="/">Swastick</Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#about"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  About
                </Link>
                <Link
                  href="#education"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Education
                </Link>
                <Link
                  href="#experience"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Experience
                </Link>
                <Link
                  href="#projects"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Projects
                </Link>
                <Link
                  href="#achievements"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Achievements
                </Link>
                <Link
                  href="#skills"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Skills
                </Link>
                <Link
                  href="#contact"
                  className="text-base font-medium hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                  scroll={false}
                >
                  Contact
                </Link>
              </nav>
              <div className="flex items-center gap-4 mt-8">
                <Link href="https://github.com/algoplutus1708" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/swastick-66a91924a/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1">
            <Link
              href="#about"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              About
            </Link>
            <Link
              href="#education"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Education
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Projects
            </Link>
            <Link
              href="#achievements"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Achievements
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors"
              scroll={false}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Link href="https://github.com/algoplutus1708" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/swastick-66a91924a/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <AnimatedParticles />
          <AnimatedBlob />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm dark:bg-primary/20 animate-pulse-slow">
                  Computer Engineering Student
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I'm <span className="text-gradient">Swastick</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                  Full Stack Developer specializing in building exceptional digital experiences.
                </p>
                <AnimatedTechStack className="mt-2 text-primary" />
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <a
                    href="mailto:swastickdas17@gmail.com"
                    className="flex items-center gap-1 hover-lift hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>swastickdas17@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-1 hover-lift">
                    <MapPin className="h-4 w-4" />
                    <span>Pune, Maharashtra</span>
                  </div>
                  <a
                    href="https://github.com/algoplutus1708"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover-lift hover:text-primary transition-colors"
                  >
                    <Code className="h-4 w-4" />
                    <span>algoplutus</span>
                  </a>
                </div>
                <div className="flex gap-4 pt-2">
                  <Button
                    asChild
                    className="rounded-full group relative overflow-hidden bg-primary hover:bg-primary/90"
                  >
                    <Link href="#contact" className="flex items-center gap-1">
                      Get in touch
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full animate-shimmer"></span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full group">
                    <Link href="#projects" className="flex items-center gap-1">
                      View my work
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full group">
                    <a href="#" className="flex items-center gap-2">
                      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl shadow-primary/10 transition-transform hover:scale-105 duration-300 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-60 mix-blend-overlay"></div>
                  <Image src="/images/profile.png" alt="Swastick" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Developer Section */}
        <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    Bringing <span className="text-gradient">Ideas</span> to Life
                  </h2>
                  <p className="text-muted-foreground">
                    As a passionate developer, I transform concepts into functional, beautiful applications. My approach
                    combines technical expertise with creative problem-solving.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <h3 className="font-medium">Frontend</h3>
                      <p className="text-sm text-muted-foreground">Creating responsive, intuitive user interfaces</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <h3 className="font-medium">Backend</h3>
                      <p className="text-sm text-muted-foreground">Building robust, scalable server solutions</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <h3 className="font-medium">Database</h3>
                      <p className="text-sm text-muted-foreground">Designing efficient data storage systems</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <h3 className="font-medium">DevOps</h3>
                      <p className="text-sm text-muted-foreground">Streamlining deployment and operations</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <AnimatedDeveloper />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Code Animation Section */}
        <section className="py-12 bg-muted/50 dark:bg-muted/20 relative overflow-hidden">
          <AnimatedWave />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Passionate about <span className="text-gradient">Clean Code</span>
                </h2>
                <p className="text-muted-foreground">
                  I believe in writing maintainable, efficient, and elegant code that solves real-world problems.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Problem Solver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Clean Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Performance Optimization</span>
                  </div>
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-500">
                <AnimatedCode />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30 dark:bg-muted/10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={1000} suffix="+" className="text-4xl font-bold text-primary" />
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="space-y-2 transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={15} suffix="+" className="text-4xl font-bold text-primary" />
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="space-y-2 transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={3} className="text-4xl font-bold text-primary" />
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-2 transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={400} suffix="+" className="text-4xl font-bold text-primary" />
                <p className="text-sm text-muted-foreground">Students Mentored</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <AnimatedBackground />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">About Me</span>
              </div>
              <AnimatedText text="Get to know me" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <ScrollReveal>
                <p className="text-lg leading-relaxed">
                  I'm a Computer Engineering student at Army Institute Of Technology, Pune with a passion for web
                  development, competitive programming, and open-source contributions. With expertise in both front-end
                  and back-end technologies, I've worked on various projects ranging from web applications to algorithm
                  visualizers.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg leading-relaxed">
                  As Joint Secretary of AIT OSS, I've led development teams for multiple web portals and events. My
                  approach to development focuses on creating clean, efficient, and maintainable code that delivers
                  exceptional user experiences. I'm constantly learning and adapting to new technologies to stay at the
                  forefront of software development.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <p className="text-lg leading-relaxed">
                  With a strong foundation in competitive programming (Specialist on Codeforces, 3-star on CodeChef), I
                  enjoy solving complex algorithmic problems and have solved over 1000 problems across various
                  platforms.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Code Animation Section */}
        <section className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <AnimatedBlob />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <AnimatedCodeTyping language="javascript" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    <span className="text-gradient">Clean Code</span>, Elegant Solutions
                  </h2>
                  <p className="text-muted-foreground">
                    I believe in writing maintainable, efficient, and elegant code that solves real-world problems. My
                    approach focuses on readability, performance, and best practices.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Modular Architecture</h3>
                        <p className="text-sm text-muted-foreground">Building scalable, maintainable systems</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Performance Optimization</h3>
                        <p className="text-sm text-muted-foreground">Creating fast, responsive applications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Testing & Quality Assurance</h3>
                        <p className="text-sm text-muted-foreground">Ensuring reliability and robustness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-muted/30 dark:bg-muted/10 relative">
          <AnimatedBlob />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Education</span>
              </div>
              <AnimatedText text="Academic Background" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ScrollReveal>
                <EducationCard
                  institution="Army Institute Of Technology, Pune"
                  degree="Bachelor of Engineering in Computer Engineering"
                  duration="Sep 2022 - May 2026"
                  location="Pune, Maharashtra"
                  gpa="SGPA - 8.52"
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <EducationCard
                  institution="Kendriya Vidyalaya Ballygunge"
                  degree="High School - PCM"
                  duration="Apr 2009 - Jun 2021"
                  location="Kolkata, West Bengal"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 relative">
          <AnimatedParticles />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Experience</span>
              </div>
              <AnimatedText text="Professional Journey" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              <ScrollReveal>
                <ExperienceCard
                  title="Teaching Assistant"
                  company="Army Institute Of Technology, Pune"
                  duration="Sep 2023 - Nov 2023"
                  location="Pune, Maharashtra"
                  description={[
                    "Mentored 400+ first-year students in a web development bootcamp, achieving 80% retention and 30% improvement in application skills.",
                    "Delivered advanced training on JavaScript ES6, React.js, Node.js, and AWS, resulting in 15+ student-led projects.",
                  ]}
                  link="https://example.com/teaching-assistant"
                  linkText="[Live]"
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <ExperienceCard
                  title="Problem Setter in Microsoft CodeQuest"
                  company="Army Institute Of Technology, Pune"
                  duration="Feb 2024 - Feb 2024"
                  location="Pune, Maharashtra"
                  description={[
                    "Designed 10+ Competitive Programming and DSA challenges for 2,000+ participants, for Microsoft-Innerve Codequest.",
                    "Enhanced problem-solving efficiency by 25% via scenario-based algorithmic challenges.",
                  ]}
                  link="https://example.com/microsoft-codequest"
                  linkText="[Live]"
                />
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <ExperienceCard
                  title="Joint Secretary AIT OSS"
                  company="Army Institute Of Technology, Pune"
                  duration="Sep 2023 - Present"
                  location="Pune, Maharashtra"
                  description={[
                    "Spearheaded development of 4 web portals for events like INNERVE, Spark, De'Verse and Open Source Projects like Anubhav using React and Express.js.",
                    "Lead Sponsorship and Finance team for INNERVE and College Level Internal Hackathon for Smart India Hackathon, achieving a record-breaking 5k+ registrations nationwide and overseeing a 10 lakh INR prize pool.",
                  ]}
                  link="https://example.com/ait-oss"
                  linkText="[Live]"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Terminal Animation Section */}
        <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <AnimatedWave />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    <span className="text-gradient">Command Line</span> Proficiency
                  </h2>
                  <p className="text-muted-foreground">
                    Comfortable with development tools, version control systems, and deployment pipelines. I leverage
                    automation to streamline workflows and improve productivity.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h3 className="font-medium">Git & Version Control</h3>
                      <p className="text-sm text-muted-foreground">Managing code repositories and collaboration</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h3 className="font-medium">CI/CD Pipelines</h3>
                      <p className="text-sm text-muted-foreground">Automating testing and deployment processes</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h3 className="font-medium">Docker & Containerization</h3>
                      <p className="text-sm text-muted-foreground">Creating consistent development environments</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <AnimatedTerminal />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/30 dark:bg-muted/10 relative">
          <AnimatedWave />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Projects</span>
              </div>
              <AnimatedText text="My Recent Work" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal>
                <ProjectCard
                  title="Anubhav"
                  description="A platform for AITians to share interview experiences with 200+ articles from seniors at top companies."
                  image="/placeholder.svg?height=300&width=500"
                  tags={["React", "Tailwind", "Express", "Multer"]}
                  demoUrl="https://example.com/anubhav-demo"
                  codeUrl="https://github.com/algoplutus1708/anubhav"
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <ProjectCard
                  title="PathFinder Visualizer"
                  description="Interactive visualization of pathfinding algorithms (DFS, BFS, Dijkstra) with random maze generation and solver."
                  image="/placeholder.svg?height=300&width=500"
                  tags={["JavaScript", "Dijkstra", "A*", "DFS", "BFS"]}
                  demoUrl="https://example.com/pathfinder-demo"
                  codeUrl="https://github.com/algoplutus1708/pathfinder"
                />
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <ProjectCard
                  title="INNERVE Web Portal"
                  description="Official web portal for INNERVE, a college-level technical event with 5k+ registrations nationwide."
                  image="/placeholder.svg?height=300&width=500"
                  tags={["React", "Express.js", "Node.js"]}
                  demoUrl="https://example.com/innerve-demo"
                  codeUrl="https://github.com/algoplutus1708/innerve"
                />
              </ScrollReveal>
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="outline" asChild className="rounded-full group">
                <a
                  href="https://github.com/algoplutus1708"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View All Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 relative">
          <AnimatedBackground />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Achievements</span>
              </div>
              <AnimatedText
                text="Recognitions & Accomplishments"
                className="text-3xl md:text-4xl font-bold tracking-tight"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal>
                <AchievementCard
                  title="Competitive Programming"
                  items={[
                    "Codeforces Max Rating: 1532 (Specialist) - algoplutus",
                    "Codechef Max Rating: 1626 (3 Star) - algoplutus",
                    "Solved more than 1000 problems in Various Online Judges",
                  ]}
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <AchievementCard
                  title="Contests & Hackathons"
                  items={[
                    "Secured 1095th rank in Facebook Hacker Cup 2023 Round 2 (AIR 154)",
                    "Secured Global Rank 946 (AIR 20) in Educational Codeforces Round 159",
                    "Cleared Mastercard Code For Change 2024 and secured an Internship Offer",
                  ]}
                />
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <AchievementCard
                  title="Leadership & Mentorship"
                  items={[
                    "Led development team for 4 web portals for college events",
                    "Mentored 400+ students in web development bootcamp",
                    "Managed 10 lakh INR prize pool for college hackathon",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-muted/30 dark:bg-muted/10 relative">
          <AnimatedBlob />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Skills</span>
              </div>
              <AnimatedText text="Technical Expertise" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="space-y-10">
              <ScrollReveal>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center">Languages</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkillBadge name="JavaScript" />
                    <SkillBadge name="Java" />
                    <SkillBadge name="Python" />
                    <SkillBadge name="C/C++" />
                    <SkillBadge name="C#" />
                    <SkillBadge name="SQL" />
                    <SkillBadge name="HTML/CSS" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center">Frameworks & Libraries</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkillBadge name="React" />
                    <SkillBadge name="Node.js" />
                    <SkillBadge name="Express" />
                    <SkillBadge name="Flask" />
                    <SkillBadge name="Spring Boot" />
                    <SkillBadge name="Material-UI" />
                    <SkillBadge name="FastAPI" />
                    <SkillBadge name="Tailwind" />
                    <SkillBadge name="JUnit" />
                    <SkillBadge name="pandas" />
                    <SkillBadge name="NumPy" />
                    <SkillBadge name="Matplotlib" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center">Developer Tools</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkillBadge name="Git" />
                    <SkillBadge name="Docker" />
                    <SkillBadge name="TravisCI" />
                    <SkillBadge name="GCP" />
                    <SkillBadge name="VS Code" />
                    <SkillBadge name="IntelliJ" />
                    <SkillBadge name="PyCharm" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Tech Stack Animation Section */}
        <section className="py-16 relative overflow-hidden">
          <AnimatedBackground />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Tech Stack</span>
              </div>
              <AnimatedText text="Technologies I Work With" className="text-3xl md:text-4xl font-bold tracking-tight" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <AnimatedTechIcons />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Diverse Technical Expertise</h3>
                  <p className="text-muted-foreground">
                    My technical toolkit spans across multiple domains, allowing me to tackle various challenges and
                    build comprehensive solutions from the ground up.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h4 className="font-medium">Frontend</h4>
                      <p className="text-sm text-muted-foreground">React, Next.js, TypeScript</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h4 className="font-medium">Backend</h4>
                      <p className="text-sm text-muted-foreground">Node.js, Express, Java</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h4 className="font-medium">Database</h4>
                      <p className="text-sm text-muted-foreground">MongoDB, PostgreSQL, Redis</p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <h4 className="font-medium">DevOps</h4>
                      <p className="text-sm text-muted-foreground">Docker, AWS, CI/CD</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Circuit Animation Section */}
        <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <AnimatedBlob />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    <span className="text-gradient">Connected</span> Development
                  </h2>
                  <p className="text-muted-foreground">
                    I approach software development as an interconnected system, where each component works in harmony
                    with others to create a seamless user experience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">System Architecture</h3>
                        <p className="text-sm text-muted-foreground">Designing scalable, maintainable systems</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">API Integration</h3>
                        <p className="text-sm text-muted-foreground">Connecting services and data sources</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Microservices</h3>
                        <p className="text-sm text-muted-foreground">Building modular, independent components</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 shadow-xl">
                  <AnimatedCircuit />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <AnimatedRocket />
          <AnimatedParticles />
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
                <span className="px-3 py-1 text-sm font-medium">Contact</span>
              </div>
              <AnimatedText text="Get In Touch" className="text-3xl md:text-4xl font-bold tracking-tight" />
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                I'm currently open to internship and collaboration opportunities. Feel free to reach out!
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="form">Contact Form</TabsTrigger>
                  <TabsTrigger value="info">Contact Info</TabsTrigger>
                </TabsList>
                <TabsContent value="form" className="mt-0">
                  <ScrollReveal>
                    <div className="bg-card dark:bg-card/50 rounded-lg border shadow-sm p-6 md:p-8 max-w-md mx-auto">
                      <ContactForm />
                    </div>
                  </ScrollReveal>
                </TabsContent>
                <TabsContent value="info" className="mt-0">
                  <ScrollReveal>
                    <div className="bg-card dark:bg-card/50 rounded-lg border shadow-sm p-6 md:p-8 max-w-md mx-auto">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4 hover-lift">
                          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-muted-foreground">
                              <a href="mailto:swastickdas17@gmail.com" className="hover:text-primary transition-colors">
                                swastickdas17@gmail.com
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 hover-lift">
                          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                            <Linkedin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">LinkedIn</h3>
                            <p className="text-muted-foreground">
                              <a
                                href="https://www.linkedin.com/in/swastick-66a91924a/"
                                className="hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                linkedin.com/in/swastick-66a91924a
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 hover-lift">
                          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                            <Github className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">GitHub</h3>
                            <p className="text-muted-foreground">
                              <a
                                href="https://github.com/algoplutus1708"
                                className="hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                github.com/algoplutus1708
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 hover-lift">
                          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Location</h3>
                            <p className="text-muted-foreground">Pune, Maharashtra, India</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-slate-900 text-white relative overflow-hidden">
        <AnimatedWave />
        <div className="container relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm">© {new Date().getFullYear()} Swastick. All rights reserved.</p>
            <p className="text-xs text-slate-400 mt-1">Computer Engineering Student & Full Stack Developer</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/algoplutus1708" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80 rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/swastick-66a91924a/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
            <a href="mailto:swastickdas17@gmail.com">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80 rounded-full">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
