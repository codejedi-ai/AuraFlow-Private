# VibeScope - Vite + AWS Amplify

This project has been refactored from Next.js to use Vite and AWS Amplify for a modern, scalable architecture.

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Backend**: AWS Amplify (GraphQL API, Authentication, Storage)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

1. Install Node.js (v18 or higher)
2. Install AWS CLI and configure your credentials
3. Install Amplify CLI: `npm install -g @aws-amplify/cli`

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Amplify (first time only):
   ```bash
   amplify init
   ```

4. Add Amplify categories:
   ```bash
   # Add authentication
   amplify add auth
   
   # Add GraphQL API
   amplify add api
   
   # Add storage (optional)
   amplify add storage
   ```

5. Push to AWS:
   ```bash
   amplify push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── lib/                # Utility functions
├── main.tsx            # Application entry point
└── App.tsx             # Main app component with routing
```

## AWS Amplify Features

### Authentication
- User sign up/sign in
- Password reset
- User profile management

### GraphQL API
- Contact form submissions
- Influencer matching algorithm
- Report generation

### Storage (Optional)
- File uploads
- Image storage for profiles

## Deployment

The application is configured for automatic deployment with AWS Amplify:

1. Connect your repository to Amplify Console
2. The `amplify.yml` file will handle the build process
3. Push changes to trigger automatic deployments

## Environment Variables

Amplify automatically manages environment variables for:
- API endpoints
- Authentication configuration
- Storage buckets

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Migration Notes

This project was migrated from Next.js to Vite + Amplify:
- Server-side API routes replaced with AWS Lambda functions
- Next.js routing replaced with React Router
- Static generation replaced with SPA deployment
- Authentication integrated with AWS Cognito