import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="user avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
        className,
      )}
    />
  ) : (
    <div
      className={cn(
        `bg-secondary flex aspect-square h-[40px] w-[40px] flex-none items-center justify-center rounded-full`,
        className,
      )}
    >
      <User className="text-muted-foreground size-6" />
    </div>
  );
}
