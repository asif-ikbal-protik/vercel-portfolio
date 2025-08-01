import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-glow-subtle hover:border-blue-500/20 hover:scale-[1.02]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// Enhanced glowing card variants
const GlowCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowType?: 'blue' | 'purple' | 'cyan' | 'gradient' | 'pulse' | 'gradient-animate'
  }
>(({ className, glowType = 'blue', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02]",
      {
        'shadow-glow-blue hover:shadow-glow-hover border-blue-500/30': glowType === 'blue',
        'shadow-glow-purple hover:shadow-glow-hover border-purple-500/30': glowType === 'purple',
        'shadow-glow-cyan hover:shadow-glow-hover border-cyan-500/30': glowType === 'cyan',
        'shadow-glow-gradient hover:shadow-glow-hover border-blue-500/30': glowType === 'gradient',
        'animate-glow-pulse': glowType === 'pulse',
        'animate-glow-gradient': glowType === 'gradient-animate',
      },
      className
    )}
    {...props}
  />
))
GlowCard.displayName = "GlowCard"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, GlowCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
