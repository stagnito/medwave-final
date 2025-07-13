import { cn } from "@/lib/utils";
import logoImage from "@assets/logo_1752423961364.png";

interface LogoProps {
  className?: string;
  variant?: "default" | "footer";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isFooter = variant === "footer";
  
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="flex items-center">
        {/* Logo Image */}
        <img 
          src={logoImage} 
          alt="VinovaMedTech Private Limited" 
          className={cn(
            "object-contain",
            isFooter ? "h-10 w-auto" : "h-12 w-auto"
          )}
        />
        
        {/* Company name text for accessibility */}
        <div className="ml-3">
          <div className={cn(
            "font-bold",
            isFooter ? "text-lg text-white" : "text-xl text-midnight"
          )}>
            VINOVA
          </div>
          <div className={cn(
            "font-medium",
            isFooter ? "text-xs text-gray-400" : "text-xs text-midnight"
          )}>
            MEDTECH PRIVATE LIMITED
          </div>
        </div>
      </div>
    </div>
  );
}
