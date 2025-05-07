import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 h-full w-10"
        title={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
}

export { PasswordInput };
