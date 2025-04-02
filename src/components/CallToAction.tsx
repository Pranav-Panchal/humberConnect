import Link from "next/link";
import Image from "next/image";

export default function CallToActionSection() {
  return (
    <div>
      {/* Call to Action Section */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="background-navy border rounded overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <div className="text-white p-4 p-md-5">
                  <h2 className="fw-bold mb-3">
                    Discover & RSVP for Events in One Click!
                  </h2>
                  <p className="mb-4">
                    Join thousands of students discovering campus events,
                    networking, and staying informed. Sign up and start
                    exploring today!
                  </p>
                  <div className="my-3">
                    <Link className="btn btn-secondary me-2 mt-2 font-bg-yellow " href="/events">
                      Explore Events
                    </Link>
                    <Link className="btn btn-light mt-2" href="/signup">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 order-first order-md-last text-center">
                <Image
                  src="/img/illustrations/web-development.svg"
                  alt="Web Development"
                  width={500}
                  height={350}
                  className="img-fluid w-100 h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-4">
                <span className="pb-3 underline">FAQ</span>
              </h2>
              <p className="text-muted">
                Find answers to the most common questions about our platform.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="accordion text-muted" id="faqAccordion">
                {[
                  {
                    question: "How does event discovery work?",
                    answer:
                      "Our system automatically fetches upcoming events from multiple sources and presents them in an easy-to-use interface.",
                  },
                  {
                    question: "Can I RSVP to multiple events?",
                    answer:
                      "Yes! You can RSVP to as many events as you'd like and receive reminders for each.",
                  },
                  {
                    question: "Who can access these events?",
                    answer:
                      "Events are exclusively for Humber students. You must sign in with your Humber email to access them.",
                  },
                ].map((faq, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          index !== 0 ? "collapsed" : ""
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-${index}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq-${index}`}
                      className={`accordion-collapse collapse ${
                        index === 0 ? "show" : ""
                      }`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="text-white background-navy border rounded d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5">
            <div>
              <h2 className="fw-bold text-secondary mb-2">
                Not sure which event suits you?
              </h2>
              <p>Contact us to find the best events for you.</p>
            </div>
            <div className="my-2">
              <Link className="btn btn-light fs-5 py-2 px-4" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
