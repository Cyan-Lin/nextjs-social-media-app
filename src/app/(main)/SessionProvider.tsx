// 這個元件是因為react cache不能再client中使用，所以要在各個component傳遞，就要使用這個方法
// 在server拿到session後，傳到這裡，供client中使用(包在main layout中)
"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

// 因為在main底下的page必須有登入權限，所以沒有null的case
interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
}
