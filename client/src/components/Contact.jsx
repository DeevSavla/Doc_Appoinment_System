import React from 'react'
import { Form, Input, message } from 'antd'

function Contact() {
  const { TextArea } = Input

  const handleSubmit = (values) => {
    message.success('Thank you for your message. We will get back to you soon!')
  }

  const contactInfo = [
    {
      icon: "fa-phone",
      title: "Phone Number",
      info: "+1 (555) 123-4567",
      subInfo: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: "fa-envelope",
      title: "Email Address",
      info: "contact@medicare.com",
      subInfo: "Online support 24/7"
    },
    {
      icon: "fa-map-marker-alt",
      title: "Location",
      info: "123 Healthcare Ave",
      subInfo: "Medical Center, City, 12345"
    }
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any questions about our services or to schedule an appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <Form
              name="contact"
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="firstName"
                  label={<span className="text-gray-700 font-medium">First Name</span>}
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input 
                    prefix={<i className="fas fa-user text-gray-400" />}
                    className="rounded-lg py-2"
                    placeholder="Enter your first name"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label={<span className="text-gray-700 font-medium">Last Name</span>}
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input 
                    prefix={<i className="fas fa-user text-gray-400" />}
                    className="rounded-lg py-2"
                    placeholder="Enter your last name"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label={<span className="text-gray-700 font-medium">Email Address</span>}
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  prefix={<i className="fas fa-envelope text-gray-400" />}
                  className="rounded-lg py-2"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label={<span className="text-gray-700 font-medium">Subject</span>}
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input 
                  prefix={<i className="fas fa-heading text-gray-400" />}
                  className="rounded-lg py-2"
                  placeholder="Enter message subject"
                />
              </Form.Item>

              <Form.Item
                name="message"
                label={<span className="text-gray-700 font-medium">Message</span>}
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea
                  rows={4}
                  className="rounded-lg"
                  placeholder="Enter your message here..."
                />
              </Form.Item>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Send Message
              </button>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className={`fas ${item.icon} text-xl text-white`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.info}</p>
                  <p className="text-sm text-gray-500">{item.subInfo}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Find Us on Map
              </h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1645523227321!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 