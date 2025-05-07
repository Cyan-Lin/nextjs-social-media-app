import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
  children,
  loading,
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  loading: boolean;
}) {
  return (
    <Button disabled={loading || disabled} className={cn(className)} {...props}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  );
}
