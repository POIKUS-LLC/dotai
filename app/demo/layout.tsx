import { redirect } from "next/navigation"

const DEBUG =
  process.env.NEXT_PUBLIC_DEBUG === "true" ||
  process.env.NODE_ENV === "development"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!DEBUG) {
    redirect("/")
  }

  return <div>{children}</div>
}
