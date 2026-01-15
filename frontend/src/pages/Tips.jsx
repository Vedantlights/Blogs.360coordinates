import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import './Tips.css'

function Tips() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      tag: "Tips",
      title: "10 Tips for Negotiating Property Price",
      description: "Master the art of property negotiation. Get the best deal with these proven strategies.",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      tag: "Tips",
      title: "Property Maintenance Tips",
      description: "Keep your property in top condition. Essential maintenance tips to preserve property value.",
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      tag: "Tips",
      title: "Home Staging Tips for Quick Sale",
      description: "Make your property more attractive to buyers. Simple staging tips that increase sale value.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      tag: "Tips",
      title: "How to Value Your Property",
      description: "Learn how to accurately assess property value. Factors that affect property pricing.",
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      tag: "Tips",
      title: "Common Property Investment Mistakes",
      description: "Avoid these costly mistakes when investing in real estate. Learn from expert advice.",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
      tag: "Tips",
      title: "Smart Financing Strategies",
      description: "Optimize your property financing. Tips for getting better loan terms and interest rates.",
    },
  ]

  return (
    <>
      <Hero 
        title="Property Tips & Tricks"
        subtitle="Expert advice and practical tips for property buyers, sellers, and investors"
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

export default Tips

