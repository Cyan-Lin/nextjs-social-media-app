建立基礎專案
npx create-next-app@latest
npm i lucia @lucia-auth/adapter-prisma prisma @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react --legacy-peer-deps
npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss --legacy-peer-deps
npx --legacy-peer-deps shadcn@latest init
npx --legacy-peer-deps shadcn@latest add button dialog dropdown-menu form input label skeleton tabs textarea sonner tooltip

extension安裝
Tailwind CSS IntelliSense，安裝後到vscode settings，搜尋files Associations，建立項目\*.css，值為tailwindcss。如果你的 Tailwind 語法有寫在 CSS 檔案裡，就需要設定 files.associations，否則 Tailwind extension 在那些檔案裡可能無法正確運作

vscode settings，搜尋Editor Quick Suggestions，將strings調整成on。開 Tailwind 開發時，記得把 editor.quickSuggestions.strings 設成 on，才能在 class 名稱的字串裡自動跳出 Tailwind class 的提示選單，會比較方便

npm i prettier + prettier-plugin-tailwindcss (給 Prettier 用的「擴充套件」，可以自動把 className 裡面的 Tailwind utility class 排成官方建議的順序)
安裝extension: Prettier - Code formatter。如果沒有裝這個 Extension，VSCode 是不會認得 Prettier 的指令的
settings搜尋Editor: Default Formatter，修改成Prettier - Code formatter。這邊是要告訴 VSCode，以後我要用 Prettier 當成預設的排版工具，這樣每次存檔（Ctrl + S）的時候，就會自動幫你用 Prettier 排版，包括 className 的排序

eslint.config.mjs加上prettier，「讓 ESLint 不要檢查格式，專心檢查程式錯誤就好。」

---
