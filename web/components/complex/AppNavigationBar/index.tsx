import siteConfig from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Navbar, NavbarNavigationMenu } from "@/components/poikus/navbar"
import { NavigationContent } from "@/components/poikus/navigation"
import PKSImage from "@/components/poikus/PKSImage"

const NavigationItems = () => (
  <NavigationMenuList className="gap-2">
    {siteConfig.navigation.mainNav.map((item) => (
      <NavigationMenuItem key={item.title}>
        {item.items ? (
          <>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationContent
                item={item}
                layoutConfig={siteConfig.navigationLayout[item.title]}
              />
            </NavigationMenuContent>
          </>
        ) : (
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href={item.href}
          >
            {item.title}
          </NavigationMenuLink>
        )}
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
)

const AppNavigationBrand = () => {
  return (
    <div className="flex items-center gap-2">
      <PKSImage
        src={siteConfig.companyLogo}
        alt="Logo"
        className="dark:hidden block"
      />
      <PKSImage
        src={siteConfig.companyLogoDark}
        alt="Logo"
        className="hidden dark:block"
      />
      <span className="text-lg font-bold">{siteConfig.companyName}</span>
    </div>
  )
}

const AppNavigationActions = () => {
  return (
    <>
      <Button variant="ghost">Sign In</Button>
      <Button>Get Started</Button>
    </>
  )
}

const AppNavigationBar = () => {
  return (
    <Navbar
      brand={<AppNavigationBrand />}
      navigationItems={
        <NavbarNavigationMenu>
          <NavigationItems />
        </NavbarNavigationMenu>
      }
      actions={<AppNavigationActions />}
    />
  )
}

export default AppNavigationBar
