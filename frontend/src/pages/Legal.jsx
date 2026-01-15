import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import './Legal.css'

function Legal() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      tag: "Legal",
      title: "Property Title Verification Process",
      description: "Complete guide to verifying property titles and avoiding legal disputes. Essential steps for buyers.",
    },
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
      tag: "Legal",
      title: "Stamp Duty and Registration Charges",
      description: "Understanding stamp duty rates, registration fees, and how to calculate them for property purchase.",
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      tag: "Legal",
      title: "Property Rights and Ownership Types",
      description: "Different types of property ownership in India: freehold, leasehold, and co-operative housing.",
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      tag: "Legal",
      title: "Sale Deed vs Agreement to Sell",
      description: "Understanding the difference between sale deed and agreement to sell. When to use each document.",
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      tag: "Legal",
      title: "Property Tax and Legal Obligations",
      description: "Complete guide to property tax, maintenance charges, and other legal obligations for property owners.",
    },
    {
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
      tag: "Legal",
      title: "Resolving Property Disputes",
      description: "Common property disputes and how to resolve them legally. When to seek legal help.",
    },
  ]

  return (
    <>
      <Hero 
        title="Legal Guides for Property"
        subtitle="Understanding property laws, documentation, and legal procedures in India"
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

export default Legal

