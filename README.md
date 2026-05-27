# FAST-NUCES Smart Parking Availability System 🚗💨

An AI-driven, full-stack real-time parking monitoring and allocation system developed for the **FAST-NUCES Lahore Campus** as part of **KIROTHON: The Finale AI Hackathon by AWS Pakistan**.

## 🚀 Project Overview
Finding a parking spot during peak university hours can be chaotic. This project provides a live dashboard that dynamically tracks, updates, and manages parking slot occupancy across different campus zones using a robust full-stack architecture and real-time database syncing.

**Live Demo Video Link:** https://drive.google.com/file/d/175AETGaPVe2ClKnpwB7zTskBA8nv9Uin/view?usp=sharing
---

## 📂 Project Structure
Here is the clean directory tree of the repository showcasing the decoupled full-stack architecture:

```text
FAST-NUCES-Smart-Parking-System-AI-Hackathon/
├── .kiro                      # Kiro environment workspace settings
├── .kiro-steering             # Project steering and build directions
├── README.md                  # Main project documentation
├── backend/
│   ├── src/
│   │   ├── configs/           # Firebase and server configurations
│   │   ├── controllers/       # Parking logic controllers
│   │   ├── routes/            # API endpoints (zones, slots, auth)
│   │   └── index.js           # Backend entry point
│   ├── package.json           # Backend dependencies & scripts
│   └── package-lock.json
└── frontend/
    ├── public/                # Static assets & icons
    ├── src/
    │   ├── components/        # Dashboard cards, slot layout, charts
    │   ├── App.jsx            # Main React application
    │   └── main.jsx           # Frontend entry point
    ├── index.html
    ├── package.json           # Frontend dependencies & scripts
    ├── vite.config.js         # Vite configuration
    └── tailwind.config.js     # Styling configuration
🛠️ Tech Stack & Architecture
Frontend: Built with React.js (Vite), styled dynamically with Tailwind CSS, and animated using Framer Motion.

Backend: Powered by Node.js and Express.js managing operational API logic.

Database & Sync: Integrated with Firebase Realtime Database for instant parking updates.

🚀 How to Run the Project Locally
Follow these steps to spin up the development environment on your local machine:

1. Clone the Repository
Bash
git clone [https://github.com/tayyab-malik92/FAST-NUCES-Smart-Parking-System-AI-Hackathon-.git](https://github.com/tayyab-malik92/FAST-NUCES-Smart-Parking-System-AI-Hackathon-.git)
cd FAST-NUCES-Smart-Parking-System-AI-Hackathon-
2. Setup and Run Backend
Open a separate terminal window, navigate to the backend folder, install dependencies, and start the server:

Bash
cd backend
npm install
npm start
The server will typically start listening on http://localhost:5000 (or your configured port).

3. Setup and Run Frontend
Open another terminal window, navigate to the frontend folder, install dependencies, and spin up the Vite development server:

Bash
cd frontend
npm install
npm run dev
The interactive dashboard will be live at http://localhost:5173.

🌟 Key Features
Live Occupancy Dashboard: Real-time visibility of total, occupied, and available spots per zone.

Zone-wise Tracking: Dynamic analytical charts showcasing occupancy percentages.

Role-based Panels: Admin, security, and employee management capabilities for efficient vehicle registry.
