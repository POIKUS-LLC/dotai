/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface SidebarMenuConfiguration {
  title: string
  url: string
  icon: React.ComponentType<any>
  children?: SidebarMenuConfiguration[]
}
