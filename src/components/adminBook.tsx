'use client';
import { useState } from 'react';
import styles from "@/app/page.module.css";

export default function AdminBookingForm() {
    const [formData, setFormData] = useState({
        name: 'IBP Office',
        email: '',
        date: '',
        time: [] as string[],
        amount: '',
        id: 'admin',
      });
    
      const availableTimes = () => {
        const times = [];
        let start = 8;
        const end = 22;
    
        while (start <= end) {
          const hour = start < 10 ? `0${start}:00` : `${start}:00`;
          const halfHour = start < 10 ? `0${start}:30` : `${start}:30`;
          if(start==22){
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
    
          } else {
            newTimeSelection = newTimeSelection.filter(time => time !== value);
          }
    
          setFormData({ ...formData, time: newTimeSelection });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        if (response.ok) {
          alert('Booking successful!');
          setFormData({ name: '', email: '', date: '', time: [], amount: '', id: '' });
        } else {
          alert('Error: ' + data.message);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <h1>Admin Booking Form</h1>        
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
    
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
                />
                <label>{time}</label>
              </div>
            ))}
    
            <button
              type="button"
              onClick={() => setFormData({ ...formData, time: [] })}
            >
              Unselect All
            </button>
    
          </div>
          </div>
    
          <label>Total number of people expected to attend</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
    
          <button type="submit" className={styles.buttonSec}>Submit</button>
        </form>
      );
    }    