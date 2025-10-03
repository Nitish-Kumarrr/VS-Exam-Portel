import React from 'react'

const Notification = () => {
    return (
        <div className="flex flex-col gap-2 shadow-lg h-[200px] w-[400px]">
            <div className="flex w-full items-center justify-between py-2 px-4">
                <h5 className="text-xl text-blue-400">Notifications</h5>
                <p className="text-md bg-orange-400 p-1 text-white rounded-md h-6 flex items-center">New</p>
            </div>
            <p className="px-4 py-2">Be notified whenever an exam is scheduled & when Analytics are ready</p>
            <div className="w-full flex items-center justify-center">
                <button className="flex items-center justify-center gap-1 h-10 px-4 bg-blue-400 text-white rounded-4xl cursor-pointer">Yes, Show Notification</button>
            </div>
        </div>
    )
}

export default Notification