import Image from "next/image"

import siteConfig from "@/config/site"

const AuthLogo = () => {
  return (
    <div
      className="absolute top-8 left-8 flex items-center gap-2"
      role="banner"
    >
      <div className="relative flex items-center">
        <Image
          src={siteConfig.companyLogo}
          alt={`${siteConfig.companyName} logo`}
          width={40}
          height={40}
          className="dark:hidden object-contain"
          aria-hidden="true"
        />
        <Image
          src={siteConfig.companyLogoDark}
          alt={`${siteConfig.companyName} logo`}
          width={40}
          height={40}
          className="hidden dark:block object-contain"
          aria-hidden="true"
        />
      </div>
      <span
        className="text-xl font-bold flex items-center"
        id="auth-page-title"
      >
        {siteConfig.companyName}
      </span>
    </div>
  )
}

export default AuthLogo

AuthLogo.displayName = "AuthLogo"
