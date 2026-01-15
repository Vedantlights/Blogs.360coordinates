import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import './Investment.css'

function Investment() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1560185127-6a8c0d29c7c6",
      tag: "Investment",
      title: "Top Property Investment Areas",
      description: "Best Indian cities for real estate investment with high growth potential.",
    },
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      tag: "Investment",
      title: "Residential vs Commercial Investment",
      description: "Compare residential and commercial property investments. Which offers better returns?",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
      tag: "Investment",
      title: "Calculating Property ROI",
      description: "Learn how to calculate return on investment for real estate properties accurately.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
      tag: "Investment",
      title: "Building a Real Estate Portfolio",
      description: "Strategies for diversifying your property investments across different locations and types.",
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      tag: "Investment",
      title: "2026 Property Market Trends",
      description: "Current market analysis and predictions for Indian real estate investment opportunities.",
    },
    {
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      tag: "Investment",
      title: "REITs vs Direct Property Investment",
      description: "Understanding Real Estate Investment Trusts and comparing them with direct property ownership.",
    },
  ]

  return (
    <>
      <Hero 
        title="Property Investment in India"
        subtitle="Expert insights on real estate investment strategies and opportunities"
      />
      <Categories />
      <section className="blog-grid">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            image={post.image}
            tag={post.tag}
            title={post.title}
            description={post.description}
          />
        ))}
      </section>
    </>
  )
}

export default Investment

