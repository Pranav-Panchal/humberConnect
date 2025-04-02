import Image from "next/image";

export default function FeaturesSection() {
  // Features List
  const features = [
    { icon: "☀️", title: "Automated Event Discovery", description: "Discover events effortlessly with automated fetching." },
    { icon: "📅", title: "Easy RSVP & Notifications", description: "RSVP quickly and get event reminders." },
    { icon: "🔍", title: "Advanced Search & Filtering", description: "Find events that match your interests in seconds." },
    { icon: "🔒", title: "Secure Humber-only Access", description: "Events exclusively for Humber students." },
  ];

  // Stats List
  const stats = [
    { value: "500+", description: "Events Automatically Fetched" },
    { value: "1000+", description: "Students Engaged in RSVPs" },
    { value: "50+", description: "Event Categories Available" },
    { value: "100%", description: "Student Authentication" },
  ];

  return (
    <section className="py-5">
      <div className="container">
        {/* Features Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3 className="fw-bold navy-font">
              Discover the Tools to Simplify Your Event{" "}
              <span className="text-primary text-warning">Experience</span>
            </h3>
          </div>
          <div className="col-md-6">
            <p className="text-muted">
              Streamline event discovery, RSVP seamlessly, and stay updated with personalized event notifications—all in one place.
            </p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="row gy-3">
              {features.map((feature, index) => (
                <div key={index} className="col-6 d-flex align-items-center">
                  <span className="fs-3 me-3">{feature.icon}</span>
                  <div>
                    <h5 className="fw-bold mb-1 navy-font">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Image */}
          <div className="col-md-6 text-center">
            <Image
              src="/img/illustrations/teamwork.svg"
              alt="Event Features"
              width={500}
              height={350}
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="row mt-5">
          {/* Stats Image */}
          <div className="col-md-6 text-center d-flex align-items-center justify-content-center">
            <Image
              src="/img/illustrations/presentation.svg"
              alt="Event Stats"
              width={500}
              height={350}
              className="img-fluid rounded"
            />
          </div>

          {/* Stats Details */}
          <div className="col-md-6">
            <h3 className="fw-bold pb-md-4 navy-font">
              Features that make event discovery more{" "}
              <span className="text-warning">efficient</span>
            </h3>
            <div className="row gy-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-6">
                  <div>
                    <span className="fs-2 fw-bold font-bg-yellow navy-font">
                      {stat.value}
                    </span>
                    <p className="fw-normal text-muted">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
