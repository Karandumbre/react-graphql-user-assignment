import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";
import { List } from "./list";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setUsers,
  setLoading,
  setError,
  setSortBy,
  setSortOrder,
} from "../store/userSlice";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../constants/query";
import { debounce } from "lodash";

export const UserList = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.user.search);
  const sortBy = useSelector((state) => state.user.sortBy);
  const sortOrder = useSelector((state) => state.user.sortOrder);
  const [searchValue, setSearchValue] = useState(search);

  const debouncedSearch = debounce((value) => {
    dispatch(setSearch(value));
  }, 500);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    dispatch(setSortBy(column));
    dispatch(setSortOrder(isAsc ? "desc" : "asc"));
  };

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { search, sortBy, sortOrder },
  });

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
      if (error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setUsers(data?.users || []));
      }
    }
  }, [loading, error, data, dispatch]);

  return (
    <div>
      <Box
        sx={{
          position: "sticky",
          top: 60,
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchValue}
          onChange={handleSearch}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === "name"}
                direction={sortBy === "name" ? sortOrder : "asc"}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "username"}
                direction={sortBy === "username" ? sortOrder : "asc"}
                onClick={() => handleSort("username")}
              >
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "email"}
                direction={sortBy === "email" ? sortOrder : "asc"}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <List />
        </TableBody>
      </Table>
    </div>
  );
};
