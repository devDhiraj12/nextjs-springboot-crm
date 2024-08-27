import Link from 'next/link'
import { Dashboard, People, BarChart, Settings } from '@mui/icons-material'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-600">QuickCRM</h1>
      </div>
      <nav className="mt-8">
        <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Dashboard className="mr-3" /> Dashboard
        </Link>
        <Link href="/employee" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <People className="mr-3" /> Employee management
        </Link>
        <Link href="/statistics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <BarChart className="mr-3" /> Statistics
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3" /> Settings
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar