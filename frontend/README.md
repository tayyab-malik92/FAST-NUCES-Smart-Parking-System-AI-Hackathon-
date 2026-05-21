# Frontend - Smart Parking Dashboard

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
copy .env.example .env
```

3. Configure Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Go to Project Settings > General
   - Under "Your apps", add a Web app
   - Copy the config values into your `.env` file
   - Make sure Realtime Database is enabled

4. Start the dev server:
```bash
npm run dev
```

App will be available at http://localhost:5173

## Features
- Real-time parking occupancy dashboard
- Admin panel for updating zone data
- Color-coded status indicators
- Responsive design for all devices
- Smooth animations with Framer Motion

## Build for Production
```bash
npm run build
```
Output will be in the `dist/` folder.
