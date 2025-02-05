# Get Started

This is a booking system built with Next.js (app router) and MongoDB for managing reservations. It includes a public booking form and an admin booking form with extended privileges. 

## Tech Stack
+ Next.js
+ React
+ MongoDB
+ Typescript

## Project Structure

```
/app
  ├── api
  │   ├── book
  │   │   ├── route.ts  (POST req for new booking)
  │   ├── bookings.tsx  (fetches and displays bookings)
  ├── book
  │   ├── page.tsx
  ├── components
  │   ├── BookingCalendar.tsx  (displays booked dates)
  │   ├── UpcomingBookings.tsx (lists upcoming reservations)

```
## Installation and Setup
0. Ensure you have node.js installed
2. Clone the repo and install dependencies
```
npm i
```
3. Create a `.env.local` file and paste the MONGO_URI
4. Run the develpment server
```
npm run dev
```
  The app will be available at `http://localhost:3000`
