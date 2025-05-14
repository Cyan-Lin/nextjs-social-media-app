import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  // 如果只檔這層權限，會有資安問題，這裡只是一個簡單的阻擋，方便直接導向
  // 如果頁面是 SSR 或 RSC（React Server Component），它們在 layout 執行前就可能已經執行某些邏輯，例如資料查詢，有資安風險，API call 或 DB query 也浪費了 server 成本
  // 在fetch data的時候同時檢查user，可以避免這個問題
  if (!session.user) {
    // redirect 會 return never，所以不需要額外寫return
    redirect("/login");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
