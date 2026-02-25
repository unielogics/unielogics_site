export default function Testimonials() {
  const testimonials = [
    {
      quote: "UnieLogics transformed our warehouse operations. The integration between systems is seamless.",
      author: "John Smith",
      role: "Operations Director",
      company: "Logistics Co."
    },
    {
      quote: "The nationwide optimization service helped us reduce shipping costs by 25%.",
      author: "Sarah Johnson",
      role: "VP of Supply Chain",
      company: "Ecommerce Brand"
    },
    {
      quote: "Finally, a platform that connects all our logistics needs in one place.",
      author: "Mike Chen",
      role: "Founder",
      company: "3PL Provider"
    }
  ]

  return (
    <section className="testimonials">
      <div className="section-title">What Our Clients Say</div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-quote">
              "{testimonial.quote}"
            </div>
            <div className="testimonial-author">
              <div className="author-name">{testimonial.author}</div>
              <div className="author-role">{testimonial.role}, {testimonial.company}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
