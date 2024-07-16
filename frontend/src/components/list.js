import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { useSelector } from "react-redux";

export const List = React.memo(() => {
  const { loading, error, users } = useSelector((state) => state.user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return users.length ? (
    users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.website}</TableCell>
        <TableCell>
          {user.company.name}, {user.company.catchPhrase}, {user.company.bs}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <></>
  );
});
