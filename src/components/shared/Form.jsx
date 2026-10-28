import * as React from "react";
import { cn } from "@/lib/utils";

// Plain label and button for the HQ's pages. They use no extra packages on purpose: a page that loads on
// demand must not pull in a package the app didn't load at startup, or Base44's preview can get stuck
// rebuilding its packages ("Failed to fetch dynamically imported module").

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
));
Label.displayName = "Label";

const VARIANTS = {
  default: "bg-app-primary text-app-on-primary",
  outline: "border border-app-border-strong bg-transparent text-app-text",
  ghost: "text-app-text active:bg-app-surface",
  link: "text-app-text underline underline-offset-4 decoration-[1.5px]",
};
const SIZES = {
  default: "h-10 px-4",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "sf-press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold leading-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      VARIANTS[variant] || VARIANTS.default,
      SIZES[size] || SIZES.default,
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";
