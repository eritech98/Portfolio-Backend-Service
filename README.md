
# 📬 Node.js Email Backend Service

A simple backend service built with **Express** and **Nodemailer** to send emails. Designed to be lightweight, environment-configurable, and easily deployable (e.g., on Railway).

---

## 🚀 Features

- Built with Node.js and Express
- Handles CORS and JSON requests
- Sends emails using Gmail SMTP via Nodemailer
- `.env` support for secure config

---

## 📁 Project Structure

```
backend/
├── index.js           # Main server file
├── .env               # Environment variables (not committed)
├── package.json       # NPM scripts and dependencies
└── README.md          # You're reading this
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
PORT=3000
```

> ⚠️ Do not commit this file! Add `.env` to your `.gitignore`.

---

## 💻 Installation & Running Locally

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
npm start
```

> Or use `npm run dev` if you're developing with live reload.

---

## 📫 Sending an Email

Make a `POST` request to:

```
POST http://localhost:3000/send
```

### Request body (JSON):

```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "Hello from Erick's email backend!"
}
```

---

## 🛠 Deployment Notes

### Railway Deployment

1. Push the code to GitHub
2. Go to [Railway](https://railway.app)
3. Click `New Project` → `Deploy from GitHub`
4. Add your environment variables (`EMAIL_USER`, `EMAIL_PASS`, etc.)
5. Deploy 🚀

---

## 🧾 Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm start`   | Start the server                |
| `npm run dev` | Run with nodemon (live reload)  |
| `npm run test`| Placeholder test script         |

---
This a sample of what to expect when the route is hit.Please note it uses gmail smtp service.
![](https://github.com/eritech98/Portfolio-Backend-Service/blob/main/React.PNG?raw=true)

## 👤 Author

Made with ❤️ by **Erick Olando**

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).

```

---
