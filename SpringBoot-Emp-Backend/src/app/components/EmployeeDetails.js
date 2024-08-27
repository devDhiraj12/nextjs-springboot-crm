import { Card, CardContent, Typography, Chip } from '@mui/material';

export default function EmployeeDetails({ employee }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          <Typography variant="h4" component="h1" className="text-center">
            {employee.name}
          </Typography>
          <div className="space-y-2">
            <Typography variant="body1">
              <span className="font-semibold">ID:</span> {employee.id}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Department:</span> {employee.department}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Email:</span> {employee.email}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Last Active:</span> {employee.lastActive}
            </Typography>
            <div>
              <span className="font-semibold">Status:</span>{' '}
              <Chip
                label={employee.status}
                color={employee.status === 'Active' ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}