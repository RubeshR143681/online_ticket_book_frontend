import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import profileImg from "../images/pro3.png";
import { useNavigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteBooking(id);
      console.log("Booking successful:", res);
      // toast.success("Booking successful");
      window.location.reload();
    } catch (err) {
      console.log("Booking failed:", err);
      // toast.error("Booking failed");
    }
  };

  return (
    <Box
      width={"100%"}
      display="flex"
      style={{
        background: "linear-gradient(to right, #20A4F3, #182B3A)",
        height: "100vh",
      }}
    >
      <Fragment>
        {" "}
        {user && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <img src={profileImg} alt="profile" style={{ width: "150px" }} />
            <Typography
              padding={1}
              width={"300px"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              marginTop={"20px"}
              bgcolor={"white"}
            >
              <span style={{ fontWeight: "600" }}>Name:</span> {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"300px"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              bgcolor={"white"}
            >
              <span style={{ fontWeight: "600" }}> Email:</span> {user.email}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              color="white"
            >
              Bookings
            </Typography>
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              width="100%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      textAlign: "center",
                      margin: 2,
                      borderRadius: "10px",
                      width: "700px",
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <span style={{ fontWeight: "600" }}>Movie:</span>{" "}
                      {booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <span style={{ fontWeight: "600" }}>Seat:</span>{" "}
                      {booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <span style={{ fontWeight: "600" }}>Date:</span>{" "}
                      {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
