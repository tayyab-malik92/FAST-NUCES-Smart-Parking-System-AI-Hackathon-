# Backend - Smart Parking API

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
   - Create a new project or use existing
   - Enable Realtime Database
   - Go to Project Settings > Service Accounts
   - Generate a new private key
   - Copy the values into your `.env` file

4. Start the server:
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/parking/zones | Get all parking zones |
| PUT | /api/parking/zones/:zoneId | Update zone occupancy |
| POST | /api/parking/zones/initialize | Reset all zones |
| GET | /api/health | Health check |

## Zone IDs
- `basementA` - Basement A
- `basementB` - Basement B
- `groundParking` - Ground Parking
- `bikeParking` - Bike Parking
