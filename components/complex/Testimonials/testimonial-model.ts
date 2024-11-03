interface Testimonial {
  id?: string
  background: string
  testimonial: string
  author: {
    name: string
    title: string
    position: string
    image: string
  }
}

export type { Testimonial }

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    background:
      "https://images.unsplash.com/photo-1729218620890-f120489dcd11?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial: "This product has revolutionized our workflow!",
    author: {
      name: "John Doe",
      title: "CEO",
      position: "TechCorp",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "2",
    background:
      "https://images.unsplash.com/photo-1729549013233-4035d2019014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    testimonial:
      "This product has revolutionized our workflow! Very long testimonial text to see how it looks like. I can't believe how good this product is. I've never seen anything like it before. It is amazing!",
    author: {
      name: "Jane Doe",
      title: "CEO",
      position: "TechCorp",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "3",
    background:
      "https://images.unsplash.com/photo-1729380137783-3d5803a8e4d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    testimonial: "This product has revolutionized our workflow!",
    author: {
      name: "John Doe",
      title: "CEO",
      position: "TechCorp",
      image: "https://github.com/shadcn.png",
    },
  },
]

export { mockTestimonials }
