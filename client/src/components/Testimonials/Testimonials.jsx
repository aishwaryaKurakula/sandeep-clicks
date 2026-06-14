import './Testimonials.css'

const TESTIMONIALS = [
  {
    text: "Sandeep captured our wedding like no one else could have. The photos are breathtaking — we keep going back to the gallery every week. Best investment we made for our big day.",
    author: "Priya & Karthik",
    event: "Wedding, Hyderabad",
  },
  {
    text: "We booked Sandeep for our daughter's naming ceremony and were blown away. He was unobtrusive, professional, and the edited photos came back in 3 days looking absolutely stunning.",
    author: "Ramesh Babu",
    event: "Naming Ceremony",
  },
  {
    text: "Our product photos for the launch campaign turned out better than we imagined. Sandeep understood the brand perfectly and delivered well within the deadline.",
    author: "Meena Krishnaswamy",
    event: "Corporate, Brand Launch",
  },
]

function TestimonialCard({ text, author, event }) {
  return (
    <div className='testimonial-card'>
      <span className='testimonial-quote' aria-hidden='true'>&ldquo;</span>
      <p className='testimonial-text'>{text}</p>
      <p className='testimonial-author'>{author}</p>
      <p className='testimonial-event'>{event}</p>
    </div>
  )
}

function Testimonials() {
  return (
    <section id='testimonials' className='testimonials-section'>
      <div className='testimonials-header'>
        <p className='section-eyebrow'>Client Love</p>
        <h2 className='section-title'>What they say</h2>
      </div>
      <div className='testimonials-grid'>
        {TESTIMONIALS.map(t => (
          <TestimonialCard key={t.author} {...t} />
        ))}
      </div>
    </section>
  )
}

export default Testimonials