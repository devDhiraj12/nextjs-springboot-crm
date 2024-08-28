"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Search,
  Add,
  MoreVert,
  FilterList,
  Sort,
  Download,
} from "@mui/icons-material";
import EmployeeDetails from "../components/EmployeeDetails";
import { deepOrange } from '@mui/material/colors';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PeopleManagement() {
  // const [people, setPeople] = useState(peopleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [viewDetails, setViewDetails] = useState(false); // State to manage view details

  const [employee, setEmployee] = useState([]);
  const [state, setState] = useState(true);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8080/list")
      .then((response) => response.data)
      .then((res) => {
        setEmployee(res);
      });
  }, [state]);

  const handleDelete = async (id) => {
    axios
      .get(`http://localhost:8080/delete/${id}`)
      .then((response) => response.data)
      .then((res) => {});
    setState(!state);
  };

  const handleEdit = (id) => {
    const url = `/employee/edit/${id}`;
    router.push(url);
  };

  const handleDetails = (person) => {
    setSelectedPerson(person);
    setViewDetails(true); // Show details view
  };

  const filteredPeople = employee.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event, person) => {
    setAnchorEl(event.currentTarget);
    setSelectedPerson(person);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPerson(null);
  };

  if (viewDetails && selectedPerson) {
    return <EmployeeDetails employee={selectedPerson} />;
  }

  return (
    <div className="container mx-auto p-6 font-inter">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-semibold text-gray-800">
          Employee Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          <Link href="/employee/create"> Add Person</Link>
        </Button>
      </div>

      <Paper className="mb-8 p-4 shadow-lg rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TextField
            variant="outlined"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Button
              startIcon={<FilterList />}
              variant="outlined"
              className="text-gray-600 border-gray-300"
            >
              Filter
            </Button>
            <Button
              startIcon={<Sort />}
              variant="outlined"
              className="text-gray-600 border-gray-300"
            >
              Sort
            </Button>
            <Button
              startIcon={<Download />}
              variant="outlined"
              className="text-gray-600 border-gray-300"
            >
              Export
            </Button>
          </div>
        </div>
      </Paper>

      <TableContainer
        component={Paper}
        className="shadow-xl rounded-lg overflow-hidden"
      >
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPeople.map((person) => (
              <TableRow
                key={person.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <TableCell>
                  <div className="flex items-center">
                    <Avatar  sx={{ bgcolor: deepOrange[500] }} className="mr-4">{person.name[0]}</Avatar>
                    <Typography variant="subtitle2">{person.name}</Typography>
                  </div>
                </TableCell>
                <TableCell>{person.department}</TableCell>
                <TableCell>
                  <Chip
                    label={person.status}
                    color={person.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{person.email}</TableCell>
                {/* <TableCell>{person.lastActive}</TableCell> */}
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, person)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleDetails(selectedPerson);
            handleMenuClose();
          }}
        >
          <Visibility fontSize="small" className="mr-2" /> View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit(selectedPerson?.id);
            handleMenuClose();
          }}
        >
          <Edit fontSize="small" className="mr-2" /> Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleDelete(selectedPerson?.id);
            handleMenuClose();
          }}
          className="text-red-600"
        >
          <Delete fontSize="small" className="mr-2" /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
