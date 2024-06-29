import React from 'react'
import { useNavigate } from 'react-router-dom';

function DoctorList({ doctor }) {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 m-2 md:m-4"
                onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
            >
                <div className="bg-blue-500 text-white px-4 py-2 font-bold text-lg md:text-xl">
                    Dr. {doctor.firstName} {doctor.lastName}
                </div>
                <div className="p-4 md:p-6">
                    <p className="text-gray-700 mb-2">
                        <b className="text-blue-600">Specialization:</b> {doctor.specialization}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <b className="text-blue-600">Experience:</b> {doctor.experience} years
                    </p>
                    <p className="text-gray-700 mb-2">
                        <b className="text-blue-600">Fees Per Consultation:</b> ${doctor.feesPerConsultation}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <b className="text-blue-600">Timings:</b> {doctor.timings}
                    </p>
                </div>
            </div>

        </>
    );
}

export default DoctorList