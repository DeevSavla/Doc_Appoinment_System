import React from 'react'

function Services() {
  const services = [
    {
      icon: "fa-user-md",
      title: "Expert Doctors",
      description: "Get connected with the best medical professionals in various specialties.",
      features: ["Experienced Specialists", "Board Certified", "24/7 Availability"]
    },
    {
      icon: "fa-clinic-medical",
      title: "Primary Care",
      description: "Comprehensive primary healthcare services for you and your family.",
      features: ["Regular Check-ups", "Preventive Care", "Health Screenings"]
    },
    {
      icon: "fa-heartbeat",
      title: "Emergency Care",
      description: "Round-the-clock emergency medical services when you need them most.",
      features: ["24/7 Emergency", "Quick Response", "Critical Care"]
    },
    {
      icon: "fa-procedures",
      title: "Operation & Surgery",
      description: "State-of-the-art surgical procedures with experienced surgeons.",
      features: ["Modern Equipment", "Skilled Surgeons", "Post-op Care"]
    },
    {
      icon: "fa-teeth",
      title: "Dental Care",
      description: "Complete dental care services for a healthy and beautiful smile.",
      features: ["Regular Cleaning", "Dental Surgery", "Orthodontics"]
    },
    {
      icon: "fa-brain",
      title: "Neurology",
      description: "Specialized care for neurological conditions and disorders.",
      features: ["Brain Disorders", "Spine Treatment", "Rehabilitation"]
    }
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h1>
          <p className="text-lg text-gray-600">
            We provide comprehensive healthcare services with a focus on quality and patient satisfaction.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <i className={`fas ${service.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team of medical professionals is here to help you 24/7.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <i className="fas fa-calendar-alt mr-2"></i>
              Book Appointment
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <i className="fas fa-phone-alt mr-2"></i>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services 