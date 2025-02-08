

# Music Festivals API 🎶

The **Music Festivals API** is a RESTful API designed to provide global music festival data, enabling clients to integrate event information seamlessly without backend development. It includes a demo client website for testing and showcases secure authentication, CRUD operations, and a subscription system for premium features.

---

## ✨ **Features**

### **For API Consumers:**
- Search for music festivals and view detailed event information.
- Test API functionality using tools like **Postman** or **cURL**.
- Subscribe to premium features for enhanced access using unique API keys.

### **For Developers:**
- Secure authentication and authorization using **Passport.js** and **JWT**.
- Perform CRUD operations on festival data.
- Integrate festival data into external applications with ease.

---

## 🛠️ **Technologies Used**

- **Frontend (Demo Client):** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Prisma)
- **Authentication:** Passport.js, JWT
- **API Testing:** Postman, cURL
- **Other Tools:** Git, RESTful API design

---

## 🚀 **Getting Started**

### Prerequisites
- Node.js and PostgreSQL installed.
- Postman or cURL for testing the API.


### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/taif-kh/musicfestivals-api.git
   ```
2. Install dependencies for the frontend and backend:
   ```bash
    cd musicfestivals-api/frontend
    npm install
    cd ../backend
    npm install
   ```
3. Set up Prisma:
- Install the Prisma CLI globally (if not already installed):

    ```bash
    npm install -g prisma
    ```
- Generate the Prisma client:

    ```bash
    npx prisma generate
    ```
- Apply database migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

4. Configure environment variables:

- Copy .env.example to .env:
    ```bash
    cp .env.example .env
    ```
- Open .env and fill in the required values:
 Replace [user], [password], [hostname], and [dbname] in DATABASE_URL with your PostgreSQL credentials.
5. Start the backend and frontend:
   ```bash
    cd ../frontend
    npm run dev
    cd ../backend
    node --watch app.js
   ```
6. Run the Demo Client:
- Navigate to the frontend folder:
    ```bash
    cd ../consumersFront
    ```
- Install dependencies::
    ```bash
    npm install
    ```
- Start the frontend development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```bash
musicfestivals-api/
├── backend/            # Backend API (Node.js, Express.js)
│   ├── routes/         # API endpoints
│   ├── prisma/         # Prisma schema and migrations
│   ├── app.js          # Entry point for the backend
│   ├── .env.example    # Environment variables template
│   └── package.json    # Backend dependencies
├── frontend/           # Demo client (React.js)
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.jsx     # Main application file
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── consumersFront/     # Example client for API consumers
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.jsx     # Consumer's Main application file
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
└── README.md           # Project documentation
```

## 📄 **License**

This project is licensed under the **MIT License**. For more details, see <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">https://opensource.org/licenses/MIT</a>.

## 🙏 Acknowledgments

- <a href="https://www.postman.com/" target="_blank" rel="noopener">Postman</a> for API testing.
- <a href="https://www.postgresql.org/" target="_blank" rel="noopener">PostgreSQL</a> for reliable database management.
- The web development community for endless resources and support.

Made with ❤️ by Taif Khaskhoussi. Let's connect on <a href="https://www.linkedin.com/in/taif-khaskhoussi/" target="_blank" rel="noopener">LinkedIn</a>!