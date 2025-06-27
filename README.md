# HobbyHub

A dynamic platform where hobby enthusiasts can connect, share experiences, and explore their interests together. HobbyHub facilitates the creation of hobby-focused groups, enabling users to find like-minded individuals and engage in meaningful interactions around their shared passions.

## 🌐 Live Site

Frontend: https://hobbyhub-new.netlify.app

Backend: https://hobbyhub-backend-nz9t.onrender.com

## Screenshots

![image](https://github.com/user-attachments/assets/95cc98a6-5325-4417-874b-4f2b50bd5e90)
![image](https://github.com/user-attachments/assets/8b522796-01dc-417b-a917-37590044f574)
![image](https://github.com/user-attachments/assets/d9e4e0a2-772d-479d-9eb9-d6c1687d67e2)



## ✨ Key Features

### User Management
- **Secure Authentication**: Firebase-powered authentication system with email/password and Google sign-in options
- **Profile Customization**: Personalized user profiles with customizable avatars and hobby preferences
- **Activity Tracking**: Track created and joined groups in one convenient dashboard

### Group Features
- **Create & Manage Groups**: Users can create hobby-focused groups with rich descriptions and customizable settings
- **Group Categories**: Organized groups by categories including Art, Music, Sports, Technology, Books, Gaming, Cooking, Fitness, Photography, and more
- **Member Management**: Flexible group membership system with join/leave functionality
- **Group Details**: Comprehensive group information including location, start date, and member capacity

### User Interface
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and intuitive interface with smooth animations and transitions
- **Real-time Updates**: Instant feedback for user actions and group updates
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Technologies Used

### Frontend
- **Framework**: React with TypeScript for type-safe code
- **Styling**: Tailwind CSS for modern and responsive design
- **State Management**: React Context API for global state management
- **Routing**: React Router for seamless navigation
- **Authentication**: Firebase Authentication
- **HTTP Client**: Axios for API communication

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **API Security**: JWT-based authentication middleware

### DevOps & Hosting
- **Frontend Hosting**: Netlify with continuous deployment
- **Backend Hosting**: Render with automatic deployments
- **Database Hosting**: MongoDB Atlas
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)
- Firebase project credentials

### Frontend Setup
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=your_backend_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_json
   PORT=5000
   ```

4. Start the server
   ```bash
   npm start
   ```

## 📱 Features in Detail

### Group Management
- Create groups with detailed information
- Set member capacity limits
- Specify group categories and locations
- Set start dates for group activities
- Join existing groups
- Leave groups when needed

### User Features
- Create and customize user profiles
- Track created and joined groups
- View group details and member information
- Real-time updates on group activities

## 🔒 Security Features

- Secure user authentication with Firebase
- Protected API endpoints with JWT verification
- Input validation and sanitization
- Error handling and logging
- Rate limiting on API endpoints

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB Atlas for database hosting
- Netlify and Render for hosting services
- All contributors and users of HobbyHub
