import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (user) {
    // redirect 會 return never，所以不需要額外寫return
    redirect("/");
  }

  return <>{children}</>;
}
