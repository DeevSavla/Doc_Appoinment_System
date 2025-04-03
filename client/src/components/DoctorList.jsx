import React from 'react'
import { useNavigate } from 'react-router-dom';

function DoctorList({ doctor }) {
    const navigate = useNavigate();
    
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/doctor/booking-appointment/${doctor._id}`)}
            >
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-4">
                    <div className="flex items-center">
                        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user-md text-white text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold">
                            Dr. {doctor.firstName} {doctor.lastName}
                        </h3>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-stethoscope text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Specialization</p>
                            <p className="font-medium text-gray-900">{doctor.specialization}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-briefcase text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium text-gray-900">{doctor.experience} years</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-dollar-sign text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Consultation Fee</p>
                            <p className="font-medium text-gray-900">${doctor.feesPerConsultation}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-clock text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Available Timings</p>
                            <p className="font-medium text-gray-900">{doctor.timings}</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center">
                            <i className="fas fa-calendar-check mr-2"></i>
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorList