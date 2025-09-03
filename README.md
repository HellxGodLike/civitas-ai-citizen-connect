🌍 Civitas AI – Frontend

Crowdsourced Civic Issue Reporting & Resolution System

Civitas AI is a platform where citizens report civic issues (potholes, garbage, broken lights, traffic, etc.), and municipal departments resolve them. Admins manage departments, reports, and rewards.

📌 Live Frontend: http://104.248.154.50:5000

🚀 Features
👤 Citizens

Login & signup portal (default landing page)

Submit new issues via AI-powered assistant (with “Other” option)

Upload photos/videos of issues

View previous reports in detail (description, status, uploaded media like pothole/traffic images)

Notifications for report progress

Earn points & redeem rewards in the store

Trust rating system

Settings page for profile, password, notifications

🏢 Departments

Separate login page

Manage incoming reports assigned by location/category

Detailed view with AI-enhanced description & media

Update statuses: Pending / Done / Rejected

Rate citizens (1–10) → affects their points

Report history archive

Settings page for department details

🛠️ Admins

Separate login page

Add/manage departments (name, city, head, email, registration time)

Monitor all reports (filters + map view)

Manage reward store (add/edit/remove items)

View analytics (reports by type, avg resolution time, citizen engagement)

Settings page for admin profile & security

🎨 UI/UX

Landing Page:

Default = Citizen login (email/password + signup link)

Link at bottom → Admin/Department login page

Report Issue Page: AI chat interface 🤖

Dropdown for issue type (Pothole, Garbage, Streetlight, Traffic, Water, Other)

Description, location, time, upload photo/video

AI validates before submission

Citizen Report Detail View:

Full description, map, status, uploaded media (e.g., pothole image)

Design:

Professional theme (blue/grey/white + yellow buttons)

Glassmorphism UI

Icons for issues & dashboards

Responsive design

⚡ Tech Stack

Frontend: React / Next.js, Tailwind CSS

API Integration: Axios/Fetch → connects to backend

AI Assistant: OpenAI API for validation & enhancement

Hosting: Deployed at http://104.248.154.50:5000
