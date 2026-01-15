import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import './Rent.css'

function Rent() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
      tag: "Rent",
      title: "Rent vs Buy in 2026",
      description: "Which option is better financially? A comprehensive analysis of current market trends.",
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      tag: "Rent",
      title: "Rental Agreement Essentials",
      description: "What to include in your rental agreement. Protect your rights as a tenant or landlord.",
    },
    {
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      tag: "Rent",
      title: "Furnished vs Unfurnished Rental",
      description: "Which is better for you? Compare costs, flexibility, and convenience of both options.",
    },
    {
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      tag: "Rent",
      title: "Security Deposit Guide",
      description: "Understanding security deposits, advance rent, and how to get your deposit back.",
    },
    {
      image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      tag: "Rent",
      title: "Rental Property Inspection Tips",
      description: "What to check before signing a rental agreement. Avoid costly mistakes.",
    },
    {
      image: "https://images.unsplash.com/photo-1556912172-45b7fa8b9be8",
      tag: "Rent",
      title: "How to Negotiate Rent",
      description: "Effective strategies to negotiate lower rent and better terms with landlords.",
    },
  ]

  return (
    <>
      <Hero 
        title="Rent Property in India"
        subtitle="Expert guides on renting apartments, houses, and commercial spaces"
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

export default Rent

