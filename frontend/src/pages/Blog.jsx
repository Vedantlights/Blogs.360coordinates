import { useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCategoryCard from '../components/BlogCategoryCard'
import FeaturedBlogCard from '../components/FeaturedBlogCard'
import BlogCard from '../components/BlogCard'
import BlogSidebar from '../components/BlogSidebar'
import CityWiseSection from '../components/CityWiseSection'
import BlogCTA from '../components/BlogCTA'
import './Blog.css'

function Blog() {
  useEffect(() => {
    document.title = 'IndiaPropertys Blog – Property News, Guides & Tips | Real Estate Insights'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Latest real estate trends, buying guides, legal tips & investment insights across India. Expert property advice for buyers, sellers & investors.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Latest real estate trends, buying guides, legal tips & investment insights across India. Expert property advice for buyers, sellers & investors.'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }
  }, [])

  const categories = [
    {
      icon: '🏠',
      title: 'Buy Property',
      description: 'Complete guides for property buyers',
      link: '/buy'
    },
    {
      icon: '🔑',
      title: 'Rent / Lease',
      description: 'Rental guides and lease tips',
      link: '/rent'
    },
    {
      icon: '📈',
      title: 'Investment Tips',
      description: 'Smart property investment strategies',
      link: '/investment'
    },
    {
      icon: '📋',
      title: 'Legal & Documentation',
      description: 'Legal guides and document checklists',
      link: '/legal'
    },
    {
      icon: '📰',
      title: 'Property News',
      description: 'Latest real estate news and updates',
      link: '/post'
    },
    {
      icon: '🗺️',
      title: 'City-wise Guides',
      description: 'Location-specific property insights',
      link: '/post'
    },
    {
      icon: '🏗️',
      title: 'Builder Projects',
      description: 'New construction and builder reviews',
      link: '/post'
    },
    {
      icon: '💰',
      title: 'Home Loans & EMI',
      description: 'Loan guides and EMI calculators',
      link: '/post'
    },
  ]

  const featuredBlogs = [
    {
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      category: 'Investment',
      title: 'Is 2026 the Right Time to Invest in Indian Real Estate?',
      excerpt: 'Explore market trends, government policies, and expert predictions to make informed investment decisions.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      category: 'Buy',
      title: 'Top 7 Mistakes First-Time Home Buyers Make in India',
      excerpt: 'Avoid common pitfalls and make your first property purchase smooth and successful with these expert tips.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      category: 'Legal',
      title: 'RERA Act: Complete Guide for Property Buyers',
      excerpt: 'Understand how RERA protects your interests and what you need to know before buying property.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      category: 'Tips',
      title: 'Home Loan EMI Calculator: Everything You Need to Know',
      excerpt: 'Calculate your EMI, understand interest rates, and plan your home loan repayment effectively.',
      link: '/post'
    },
  ]

  const latestBlogs = [
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
      tag: 'Buy',
      title: 'Property Inspection Checklist: What to Check Before Buying',
      description: 'Complete checklist for inspecting properties including structural integrity, amenities, and neighborhood assessment.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154526-990dac4d8e3d',
      tag: 'Investment',
      title: 'Budget Planning for Home Purchase: Hidden Costs Revealed',
      description: 'Learn about all costs involved in buying property including down payment, registration, stamp duty, and hidden expenses.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b',
      tag: 'Rent',
      title: 'Rental Agreement Essentials: What Every Tenant Should Know',
      description: 'Key clauses, legal requirements, and tips for creating a secure rental agreement in India.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1',
      tag: 'Legal',
      title: 'Property Documents Verification: Step-by-Step Guide',
      description: 'How to verify property documents, check encumbrances, and ensure a safe property transaction.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
      tag: 'Tips',
      title: 'Negotiation Tips: How to Get the Best Property Deal',
      description: 'Expert strategies for negotiating property prices and terms to get the best value for your money.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      tag: 'Investment',
      title: 'Real Estate vs Other Investments: A Comprehensive Comparison',
      description: 'Compare real estate with stocks, mutual funds, and other investment options to make informed decisions.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      tag: 'Buy',
      title: 'New Construction vs Resale: Which is Better?',
      description: 'Compare the pros and cons of buying new construction versus resale properties in the Indian market.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb',
      tag: 'Legal',
      title: 'Stamp Duty and Registration Charges: Complete Guide',
      description: 'Understand stamp duty rates, registration charges, and how to calculate total costs for property registration.',
      link: '/post'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      tag: 'Tips',
      title: 'Vastu Tips for Home Buyers: Traditional Wisdom Meets Modern Living',
      description: 'Essential Vastu principles to consider when buying a home for positive energy and prosperity.',
      link: '/post'
    },
  ]

  return (
    <>
      <Hero 
        title="IndiaPropertys Blog – Property News, Guides & Tips"
        subtitle="Latest real estate trends, buying guides, legal tips & investment insights across India"
      />
      <Categories />
      
      {/* Blog Categories Section */}
      <section className="blog-categories-section">
        <div className="blog-categories-container">
          <div className="blog-categories-grid">
            {categories.map((category, index) => (
              <BlogCategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                link={category.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="featured-blogs-section">
        <div className="featured-blogs-container">
          <h2 className="section-title">Featured Articles</h2>
          <div className="featured-blogs-grid">
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard
                key={index}
                image={blog.image}
                category={blog.category}
                title={blog.title}
                excerpt={blog.excerpt}
                link={blog.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="blog-main-content">
        <div className="blog-main-container">
          <div className="blog-content-wrapper">
            {/* Latest Blogs */}
            <div className="latest-blogs-section">
              <h2 className="section-title">Latest Articles</h2>
              <section className="blog-grid">
                {latestBlogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    image={blog.image}
                    tag={blog.tag}
                    title={blog.title}
                    description={blog.description}
                    link={blog.link}
                  />
                ))}
              </section>
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* City-wise Section */}
      <CityWiseSection />

      {/* CTA Section */}
      <BlogCTA />
    </>
  )
}

export default Blog

