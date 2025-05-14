import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cookies } from "next/headers"; // Next.js 中用來存取 cookie 的 API
import { cache } from "react"; // 用於避免在同一 render 中，重複執行[相同參數]的非同步函式（僅在 server component 中作用）(優化手段)
import prisma from "@/lib/prisma";

// 建立 Lucia 所需的 Adapter，需指定 session 與 user 的 table
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // 如果是在 production 環境下，cookie 使用 secure（只能在 HTTPS 傳輸）
      secure: process.env.NODE_ENV === "production",
    },
  },

  // 定義從資料庫中取出的 user 欄位要怎麼轉成前端user物件
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      username: attributes.username,
      displayName: attributes.displayName,
      avatarUrl: attributes.avatarUrl,
      googleId: attributes.googleId,
    };
  },
});

// 驗證 session 並自動延長有效時間
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const cookieStore = await cookies();

    // 從 cookie 中取得 session id（Lucia 會預設儲存在 cookie 中）
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

    // 如果沒有 sessionId，代表使用者尚未登入
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      // session 未過期
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);

        //   根據目前的 session ID 建立一個新的 session cookie
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }

      // session 已過期或無效
      // if (!result.session) {
      // 建立一個過期的、用於清除使用者瀏覽器中 session cookie 的 cookie
      // const sessionCookie = lucia.createBlankSessionCookie();
      // cookieStore.set(
      //   sessionCookie.name,
      //   sessionCookie.value,
      //   sessionCookie.attributes,
      // );
      // }
    } catch (e: unknown) {
      console.error("error", e);
    }

    // 回傳 user 和 session 結果
    return result;
  },
);

// 擴充 Lucia 的型別定義
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;

    // 定義從資料庫撈出來的 user 欄位有哪些，供 Lucia 驗證時使用(Lucia 在驗證的時候會自己撈，只要定義好就OK了)
    DatabaseUserAttributes: {
      id: string;
      username: string;
      displayName: string;
      avatarUrl: string | null;
      googleId: string | null;
    };
  }
}
