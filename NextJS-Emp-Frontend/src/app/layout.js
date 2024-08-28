import Sidebar from './components/Sidebar'
import './globals.css'

export const metadata = {
  title: 'QuickCRM',
  description: 'A simple CRM application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter  bg-gray-100">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1  overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}