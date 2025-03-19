'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/page.module.css";

export default function BookingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: [] as string[],
    amount: '',
    id: '',
  });

  const availableTimes = () => {
    const times = [];
    let start = 8;
    const end = 22;

    while (start <= end) {
      const hour = start < 10 ? `0${start}:00` : `${start}:00`;
      const halfHour = start < 10 ? `0${start}:30` : `${start}:30`;
      if (start == 22) {
        times.push(hour);
      } else {
        times.push(hour, halfHour);
      }
      start++;
    }
    return times;
  };

  const timesList = availableTimes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'time') {
      let newTimeSelection = [...formData.time];

      if (checked) {
        newTimeSelection.push(value);
        const sortedSelection = newTimeSelection
          .map((t) => timesList.indexOf(t))
          .sort((a, b) => a - b);

        const firstIndex = sortedSelection[0];
        const lastIndex = sortedSelection[sortedSelection.length - 1];
        newTimeSelection = timesList.slice(firstIndex, lastIndex + 1);

        if (newTimeSelection.length > 9) {
          alert('The maximum time allowed for a reservation is 4 hours.');
          return;
        }
      } else {
        newTimeSelection = newTimeSelection.filter(time => time !== value);
      }

      setFormData({ ...formData, time: newTimeSelection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const handleOpenPopup = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    const tmr =  new Date(today);
    tmr.setDate(today.getDate()+1);

    if(!formData.date || selectedDate < tmr){
      alert("Same-day bookings are not allowed. Please select a later date.");
      return;
    }

    try {
      const response = await fetch(
        `/api/check-bookings?date=${formData.date}&id=${formData.id}`
      );
      const data = await response.json();

      if (data.totalBookings >= 2) {
        alert("No more bookings allowed for this date.");
        return;
      }

      if (data.userDailyBookings >= 1) {
        alert("You have already made a booking today.");
        return;
      }

      if (data.userWeeklyBookings >= 2) {
        alert("You have reached the weekly booking limit.");
        return;
      }

      setShowPopup(true);
    } catch (error) {
      alert("Error checking booking limits :(");
    }
  };

  const handleConfirmBooking = async () => {
    if (!isChecked) return;

    if (formData.time.length < 2) {
      alert('Please select at least 2 time slots.');
      setShowPopup(false);
      return;
    }

    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Booking Successful!");
      setFormData({ name: '', email: '', date: '', time: [], amount: '', id: '' });
      setShowPopup(false); 
      router.push('/');
    } else {
      alert('Error: ' + data.message);
      setShowPopup(false); 
    }
  };

  return (
    <>
      <form onSubmit={handleOpenPopup}>
        <h1>Booking Form</h1>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Student ID</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Date</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date || ""}
          min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} //lol im trying to offset the timezone change
          onChange={(e) => {
            handleChange(e);
          }} 
          required 
        />

        <label>Time</label>
        <div className={styles.timeContainer}>
          <div className={styles.timeGrid}>
            {timesList.map((time, index) => (
              <div key={index} className={styles.timeSlot}>
                <input
                  type="checkbox"
                  name="time"
                  value={time}
                  checked={formData.time.includes(time)}
                  onChange={handleChange}
                  disabled={formData.time.length >= 9 && !formData.time.includes(time)} 
                />
                <label>{time}</label>
              </div>
            ))}

            <button type="button" onClick={() => setFormData({ ...formData, time: [] })}>
              Unselect All
            </button>
          </div>
        </div>

        <label>Total number of people expected to attend</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="7" max="30" required />
        <button type="submit" className={styles.buttonSec}>Submit</button>
      </form>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Booking Confirmation</h2>
            <p>By clicking the box below, you confirm that you have read and agree with our </p>
            <a href="https://docs.google.com/document/d/1io15-ZhguvW2wv40htRJ5id0cydjHURrhhXLa0Pej7I/edit?usp=sharing"
              target="_blank" rel="noopener nonreferrer" style={{ color: "blue", textDecoration: "underline" }}>IBP Room 112 Rules and Regulations.</a>
            <label style={{padding: "5px"}}>
              <input type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} style={{padding: "10px"}}/>
               I have read and agree with the Rules and Regulations.
            </label>
            <button onClick={handleConfirmBooking} disabled={!isChecked}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}
