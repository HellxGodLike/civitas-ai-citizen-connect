<h1 align="center">🌍 Civitas AI – Frontend</h1>  
<p align="center"><b>Crowdsourced Civic Issue Reporting & Resolution System</b></p>  

<p align="center">
Civitas AI empowers citizens to report civic issues like <b>potholes, garbage, broken lights, traffic</b>, etc.  
Municipal departments resolve them, and admins manage everything with rewards & analytics.  
</p>  

---

## 🔗 Live Demo  
👉 **[Civitas AI Frontend](http://104.248.154.50:8080)**  

---

## 🚀 Features  

### 👤 Citizens  
✔️ Login & signup portal (default landing page)  
✔️ Submit issues via **AI-powered assistant** (with **Other** option)  
✔️ Upload photos/videos (e.g., pothole/traffic images)  
✔️ View previous reports in detail (description, status, media)  
✔️ Notifications for report updates  
✔️ Earn points & redeem rewards in the store  
✔️ Trust rating system  
✔️ **Settings page** for profile, password & notifications  

---

### 🏢 Departments  
✔️ Separate login page  
✔️ Manage assigned reports (location/category)  
✔️ Detailed view with AI-enhanced description & media  
✔️ Update statuses → **Pending / Done / Rejected**  
✔️ Rate citizens (1–10)  
✔️ Access report history archive  
✔️ **Settings page** for department details  

---

### 🛠️ Admins  
✔️ Separate login page  
✔️ Manage departments (name, city, head, email, reg. time)  
✔️ Monitor reports (filters + map view)  
✔️ Manage reward store (add/edit/remove items)  
✔️ Analytics (report volume, resolution time, engagement)  
✔️ **Settings page** for admin profile & security  

---

## 🎨 UI Highlights  

<table>
<tr>
<td align="center"><b>Landing Page</b></td>
<td align="center"><b>Citizen Dashboard</b></td>
<td align="center"><b>Report Issue (AI Bot)</b></td>
</tr>
<tr>
<td><i>Email/Password login with signup option + link to Admin/Dept login</i></td>
<td><i>Reports list with status & notification bell</i></td>
<td><i>AI assistant with dropdown (Pothole, Garbage, Traffic, Other), description, location, media upload</i></td>
</tr>
</table>  

- **Design Style:**  
  🎨 Glassmorphism cards over gradient/cityscape backgrounds  
  📱 Mobile-first responsive layout  
  🟡 Yellow action buttons with hover effects  
  🛠️ Icons for issue types, notifications & rewards  

---

## ⚡ Tech Stack  
- **Frontend:** React / Next.js, Tailwind CSS  
- **API Integration:** Axios/Fetch  
- **AI Assistant:** OpenAI API for validation & enhancement  
- **Hosting:** [http://104.248.154.50:8080](http://104.248.154.50:8080)  

---

## 🏗️ Getting Started  

```bash
# Clone the repo
git clone https://github.com/your-username/civitas-ai-frontend.git
cd civitas-ai-frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
