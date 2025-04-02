# HumberConnect 📅🎓

**HumberConnect** is a centralized event discovery and RSVP platform tailored for Humber College students. It integrates Instagram reels/posts, filters events, enables RSVP, reminders, and Google Calendar integration. Built with **Next.js 13 App Router**, **MongoDB**, **Tailwind + Bootstrap**, and **NextAuth.js**.

---

## 🔗 Features

- 🔐 **Authentication with Humber n-ID email validation** (`nXXXXXXXX@humber.ca` only)
- 📷 **Instagram Integration** for Humber Campus events (`lifeathumber`)
- 🎯 **Filter by Campus**: North, Lakeshore, IGS
- 🗓️ **RSVP with Status Toggle** ("Going" / "Not Going")
- 🔔 **Reminders for Upcoming Events (within 3 days)**
- 📤 **WhatsApp + Copy Link Sharing**
- 📅 **Google Calendar Integration**
- 📆 **Calendar View (Coming soon!)**
- 💾 **Saved Events Dashboard**
- 🎨 **Styled with Bootstrap 5 + Tailwind**
- 🔒 **NextAuth + JWT session handling**

---

## 🧑‍🤝‍🧑 Team SMP


### 👨‍💻 Pranav Panchal — *Team Lead / Frontend & Backend*
- Integrated Instagram API
- Implemented RSVP toggle and logic
- Built campus/date filters
- Integrated Google Calendar export
- Developed login/signup with NextAuth + JWT
- Designed MongoDB models and schemas

---

### 🎨 Mitali Sisodia — *UI/UX Designer*
- Designed responsive layout using Tailwind + Bootstrap
- Styled event cards and modal layouts
- Built consistent branding with Humber logo and color palette
- Styled and build authentication pages (Login & Signup) with nID verification

---

### 🧠 Shrabani Sagareeka — *Backend Developer*
- Implemented REST API for RSVP and saved-events
- Connected MongoDB using Mongoose
- Added logic for event status (e.g., “🔥 Happening Soon”)
- Integrated clipboard and WhatsApp sharing functionality

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 13 App Router, TypeScript, Tailwind CSS, Bootstrap
- **Backend**: MongoDB (Mongoose), REST API (Next.js API routes)
- **Authentication**: NextAuth.js with CredentialsProvider
- **Calendar Integration**: Google Calendar button component

---

## 📁 Folder Structure

```bash
/src
 ├── app
 │   ├── api
 │   │   └── saved-events
 │   ├── events/page.tsx
 │   └── auth
 │       ├── login/page.tsx
 │       └── signup/page.tsx
 ├── components
 │   ├── Navbar.tsx
 │   ├── Footer.tsx
 │   └── GoogleCalendarButton.tsx
 ├── models/User.ts
 ├── models/SavedEvent.ts
 └── lib/dbConnect.ts
```

---

## 📸 Screenshots

> ![image](https://github.com/user-attachments/assets/a903d152-8768-487b-bddd-87ea24f130f7)
> ![image](https://github.com/user-attachments/assets/7511ac70-ddba-4403-bb0c-3eefd2277e79)


---

## ✅ How to Run Locally

1. Clone the repo  
```bash
git clone https://github.com/your-repo/humber-connect.git
cd humber-connect
```

2. Install dependencies  
```bash
npm install
```

3. Set up `.env.local`  
```
MONGODB_URI=your-mongodb-connection-uri
NEXTAUTH_SECRET=your-random-secret
```

4. Run the app  
```bash
npm run dev
```

---

## ❤️ Special Thanks

To the Humber College community and Student Life team for always creating exciting events and content. This platform aims to make event engagement more efficient and student-focused.

---

> Built with 💡 by **Team SMP** – Pranav, Mitali, Shrabani
