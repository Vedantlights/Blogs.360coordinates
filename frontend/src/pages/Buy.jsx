import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import './Buy.css'

function Buy() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      tag: "Buy",
      title: "How to Buy Your First Home",
      description: "Complete beginner guide for first-time buyers covering everything from budgeting to closing the deal.",
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      tag: "Buy",
      title: "Home Loan Process Explained",
      description: "Step-by-step guide to securing a home loan in India. Learn about eligibility, documents, and approval process.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      tag: "Buy",
      title: "New Construction vs Resale Properties",
      description: "Compare the pros and cons of buying new construction versus resale properties in India.",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      tag: "Buy",
      title: "Essential Documents for Property Purchase",
      description: "Complete checklist of all documents you need when buying property in India. Don't miss anything!",
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      tag: "Buy",
      title: "Property Inspection Checklist",
      description: "What to check before buying a property. Structural integrity, amenities, and neighborhood assessment.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dac4d8e3d",
      tag: "Buy",
      title: "Budget Planning for Home Purchase",
      description: "How to calculate your budget including down payment, registration, stamp duty, and hidden costs.",
    },
  ]

  return (
    <>
      <Hero 
        title="Buy Property in India"
        subtitle="Complete guides and expert advice for property buyers"
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

export default Buy

