import React, { useState } from 'react'
import HeadingDescription from '../HeadingDescription'
import FloatingLabel from '../FloatingLabel'
import { MdSend } from 'react-icons/md'
import ChangePassword from '../ChangePassword'
import EditProfile from '../EditProfile'
import Notification from '../Notification'
import Tabs from '../UI/Tabs'
import { FaPlus } from 'react-icons/fa6'

const Settings = () => {
  const tabs = ["Change Password","Edit Profile","Notification" ]
  const [activeTab, setActiveTab] = useState("Change Password");
  return (
    <div className="h-full flex flex-col gap-[10px]">
      <HeadingDescription heading="Account Settings" description="Get Notifications, Change your Password" />
      <div className="w-full flex flex-col items-center gap-6 p-4" >
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Notification" && <Notification />}
        {activeTab === "Change Password" && <ChangePassword />}
        {activeTab === "Edit Profile" && <EditProfile />}
      </div>
    </div>
  )
}

export default Settings