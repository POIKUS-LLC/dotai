import PKSImage from "@/components/poikus/PKSImage"

interface HowToStep {
  title: string
  description: string
  image?: string
}
const HowToStep = ({ title, description, image }: HowToStep) => {
  return (
    <div key={`${title}-${description}-${image}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-muted-foreground my-4">{description}</p>
      {/* {image && (
        <PKSImage
          src={image}
          alt={title}
          width={750}
          height={400}
          className="hidden md:block"
        />
      )}
      {image && (
        <PKSImage
          src={image}
          alt={title}
          width={300}
          height={150}
          className="block md:hidden"
        />
      )} */}
      <div className="flex justify-center">Image preview coming soon...</div>
    </div>
  )
}

const HowToPage = () => {
  const steps: HowToStep[] = [
    {
      title: "1. Choose Your Programming Languages and Platforms",
      description:
        "Begin by selecting the programming languages and platforms that align with your project's technology stack. This selection allows you to filter AI implementations that are compatible with your existing tools and frameworks, ensuring a seamless integration process.",
      image: "/images/how-to/filter.png",
    },
    {
      title: "2. Browse and Select the Optimal AI Implementation",
      description:
        "Navigate through our extensive library of AI implementations, each tailored to specific use cases and industries. Carefully review the available options and choose the implementation that best fits your project’s requirements, ensuring it meets your functionality and performance needs.",
      image: "/images/how-to/select.png",
    },
    {
      title: "3. Inspect the Implementation with Preview",
      description:
        "Utilize our preview feature to thoroughly examine the AI implementation before downloading. Review the code structure, dependencies, and detailed documentation to ensure that the solution aligns with your project standards and can be effectively integrated.",
      image: "/images/how-to/preview.png",
    },
    {
      title: "4. Download the AI Implementation Package",
      description:
        "After confirming that the AI implementation meets your needs, download the complete package directly into your project environment. The package includes all necessary files, libraries, and dependencies to facilitate a straightforward and efficient integration process.",
      image: "/images/how-to/download.png",
    },
    {
      title: "5. Open and Configure in Cursor IDE",
      description:
        "Launch Cursor, our recommended Integrated Development Environment (IDE), to open the downloaded AI implementation. Cursor provides specialized tools and features optimized for AI development, enhancing your ability to configure and manage the code effectively.",
      image: "/images/how-to/cursor.png",
    },
    {
      title: "6. Tailor the AI Implementation to Your Needs",
      description:
        "Customize the AI implementation to suit your specific project requirements. Leverage the modular and well-documented codebase to adjust functionalities, integrate additional features, and ensure the AI solution operates seamlessly within your application.",
      image: "/images/how-to/customize.png",
    },
    {
      title: "7. Launch and Manage Your AI Session",
      description:
        "Initiate your AI-powered features by executing the `@session-start` command to begin the AI session and `@session-end` to terminate it. These commands manage the lifecycle of your AI interactions, ensuring efficient resource usage and optimal performance throughout your application's runtime.",
      image: "/images/how-to/session.png",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Let's Deep Dive into .AI</h1>
      <div className="space-y-12">
        {steps.map((step) => (
          <HowToStep key={step.title} {...step} />
        ))}
      </div>
    </main>
  )
}

export default HowToPage
