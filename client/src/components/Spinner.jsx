import React from 'react'

function Spinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center h-10 w-10">
                <span className="absolute inline-block h-full w-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></span>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner