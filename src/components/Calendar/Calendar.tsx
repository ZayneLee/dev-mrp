"use client";

import { Schedule } from "@/pages/api/schedules";
import { useState, useEffect } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const response = await fetch("/api/schedules");
    const data: Schedule[] = await response.json();
    console.log("Fetched schedules:", data);
    setSchedules(data);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const handleAddSchedule = async () => {
    if (!description || !selectedDate) return;
    const response = await fetch("/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate, description }),
    });
    if (response.ok) {
      fetchSchedules();
      setDescription("");
      setSelectedDate(null);
    }
  };

  const handleEditSchedule = async () => {
    if (!description || !currentScheduleId) return;
    const response = await fetch(`/api/schedules/${currentScheduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    if (response.ok) {
      fetchSchedules();
      setDescription("");
      setIsEditing(false);
      setCurrentScheduleId(null);
      setSelectedDate(null);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    const response = await fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchSchedules();
      setDescription("");
      setIsEditing(false);
      setCurrentScheduleId(null);
      setSelectedDate(null);
    }
  };

  const handleDateClick = (date: string) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
    const schedule = schedules.find((s) => s.date === date);
    if (schedule) {
      setDescription(schedule.description);
      setIsEditing(true);
      setCurrentScheduleId(schedule.id);
    } else {
      setDescription("");
      setIsEditing(false);
      setCurrentScheduleId(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-96 from-red-100 via-red-300 to-red-500 bg-gradient-to-br">
      <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-2xl shadow-xl flex flex-col">
        {/* Calendar Header */}
        <div className="flex justify-between pb-4">
          <div className="-rotate-90 cursor-pointer">
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.001 6L6.00098 1L1.00098 6"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="uppercase text-sm font-semibold text-gray-600">
            {date.toLocaleString("default", { month: "long" })} -{" "}
            {date.getFullYear()}
          </span>
          <div className="rotate-90 cursor-pointer">
            <svg
              width="12"
              height="7"
              viewBox="0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.001 6L6.00098 1L1.00098 6"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Days of the week */}
        <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
          <div className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-red-500 text-red-500 shadow-md">
            Sun
          </div>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Mon
          </span>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Tue
          </span>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Wed
          </span>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Thu
          </span>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Fri
          </span>
          <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
            Sat
          </span>
        </div>
        {/* Calendar Dates */}
        <div className="flex flex-wrap justify-between font-medium text-sm pb-2">
          {Array.from({ length: 31 }, (_, day) => {
            const currentDay = new Date(
              date.getFullYear(),
              date.getMonth(),
              day + 1
            );
            const formattedDate = currentDay.toISOString().split("T")[0];
            const schedule = schedules.find((s) => s.date === formattedDate);
            return (
              <span
                key={day}
                className={`px-1 w-14 flex justify-center items-center border ${
                  schedule
                    ? "border-red-500 text-red-500"
                    : "hover:border-green-500 hover:text-green-500"
                } cursor-pointer`}
                onClick={() => handleDateClick(formattedDate)}
              >
                {day + 1}
              </span>
            );
          })}
        </div>
        {/* Schedule Form */}
        {selectedDate && (
          <div className="flex flex-col pt-4">
            <input
              type="text"
              className="p-2 border rounded mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Schedule Description"
            />
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={isEditing ? handleEditSchedule : handleAddSchedule}
              >
                {isEditing ? "Edit Schedule" : "Add Schedule"}
              </button>
              {isEditing && (
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleDeleteSchedule(currentScheduleId!)}
                >
                  Delete Schedule
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
