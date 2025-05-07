建立基礎專案
npx create-next-app@latest
npm i lucia @lucia-auth/adapter-prisma ~~prisma~~ @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react @node-rs/argon2 --legacy-peer-deps
npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss --legacy-peer-deps
npx --legacy-peer-deps shadcn@latest init 安裝與初始化 shadcn/ui 元件庫，一個建立在 React + Tailwind CSS 之上的 UI 組件工具包
npx --legacy-peer-deps shadcn@latest add button dialog dropdown-menu form input label skeleton tabs textarea sonner tooltip 元件會被「直接產生」在 components/ui/ 裡

extension安裝
Tailwind CSS IntelliSense，安裝後到vscode settings，搜尋files Associations，建立項目\*.css，值為tailwindcss。如果你的 Tailwind 語法有寫在 CSS 檔案裡，就需要設定 files.associations，否則 Tailwind extension 在那些檔案裡可能無法正確運作

vscode settings，搜尋Editor Quick Suggestions，將strings調整成on。開 Tailwind 開發時，記得把 editor.quickSuggestions.strings 設成 on，才能在 class 名稱的字串裡自動跳出 Tailwind class 的提示選單，會比較方便

npm i prettier + prettier-plugin-tailwindcss (給 Prettier 用的「擴充套件」，可以自動把 className 裡面的 Tailwind utility class 排成官方建議的順序)
安裝extension: Prettier - Code formatter。如果沒有裝這個 Extension，VSCode 是不會認得 Prettier 的指令的
settings搜尋Editor: Default Formatter，修改成Prettier - Code formatter。這邊是要告訴 VSCode，以後我要用 Prettier 當成預設的排版工具，這樣每次存檔（Ctrl + S）的時候，就會自動幫你用 Prettier 排版，包括 className 的排序

eslint.config.mjs加上prettier，「讓 ESLint 不要檢查格式，專心檢查程式錯誤就好。」

---

建立DB
使用 Vercel Dashboard 上面的Storage功能，建立Database，此次使用 Prisma Postgres
建立完成後，跑command: npx prisma init，初始化prisma(ORM)，把剛才在Vercel建立的Prisma Postgres上面的DATABASE_URL貼到.env
按照prisma官方doc建立與postgres的橋樑: https://www.prisma.io/docs/guides/nextjs
因為不同版本使用的工具各不相同，所以還是參照最新的doc來做比較好
npx prisma studio 可以在local查看db

Authentication: Lucia
與nextAuth不同的地方在於Lucia的彈性較大、可以高度客製化；而nextAuth比較入門，可以快速建立第三方OAuth，但模板較陽春

Validation
使用Zod用來做表單驗證(前後端都可使用)
reusable schema，可以重複使用的驗證設定

signup/signin/logout(還沒做)
使用server actions，不用寫api route去fetch
表單使用react-hook-form + zod + shadcn
新增component(基於shadcn): PasswordInput、LoadingButton
在需要server action的地方使用useTransition，解決在登入驗證/註冊成功後，觸發redirect時，使用setState會直接讓狀態更新loading為false，造成user體驗不佳的情況 // 改用loading也沒感覺有差別，不用訂有什麼實際用處

---
