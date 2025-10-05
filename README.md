# Purple Survey App

**Purple Survey** is a modern Electronic Data Capture (EDC) web application for creating, managing, and sharing surveys online. Built with React and Node.js, it provides a tech-forward, user-friendly platform for both fun and serious data collection.

## 🎯 Features

- **Dual Survey Modes**: Create both entertaining and professional surveys
- **Real-time Analytics**: View responses and insights as they come in  
- **Easy Sharing**: Share surveys via simple links - no registration required for respondents
- **Multiple Question Types**: Text, multiple choice, ratings, dates, and more
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Instant Publishing**: Publish surveys immediately or keep as drafts

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aphexlog/purple.git
   cd purple
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

   This starts both the backend server (port 5000) and frontend development server (port 3000).

4. **Open your browser**
   Navigate to `http://localhost:3000` to start creating surveys!

## 📊 Survey Types

### Fun Surveys
Perfect for personality quizzes, entertainment, and engaging content:
- Colorful themes and animations
- Social sharing features  
- Gamification elements
- Playful result presentations

### Serious Surveys
Designed for research, feedback collection, and professional data gathering:
- Clean, distraction-free interface
- Advanced validation rules
- Professional styling
- Export capabilities

## 🛠 Development

### Project Structure

```
purple/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── contexts/      # React context providers
│   │   └── types/         # TypeScript type definitions
├── server/                # Node.js backend
│   ├── routes/           # API route handlers
│   ├── models/           # Database models
│   └── data/            # SQLite database
└── package.json          # Main package configuration
```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server
- `npm run server:dev` - Start only the backend server
- `npm run client:dev` - Start only the frontend development server

### API Endpoints

- `GET /api/surveys` - List all surveys
- `POST /api/surveys` - Create a new survey  
- `GET /api/surveys/:id` - Get survey details
- `PUT /api/surveys/:id` - Update a survey
- `PATCH /api/surveys/:id/publish` - Publish/unpublish a survey
- `POST /api/responses/:surveyId` - Submit a survey response
- `GET /api/responses/survey/:surveyId` - Get survey responses
- `GET /api/responses/analytics/:surveyId` - Get survey analytics

## 🎨 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Heroicons
- **Backend**: Node.js, Express.js, SQLite
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS with custom gradients
- **Database**: SQLite (easily upgradeable to PostgreSQL)

## 🔧 Configuration

The application uses environment variables for configuration:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## 📱 Mobile Support

Purple Survey is fully responsive and works great on all devices:
- Touch-friendly interfaces
- Mobile-optimized layouts
- Swipe gestures support
- Progressive Web App capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT — use it, hack it, share it.

---

*Built with ❤️ for modern data collection needs.*

