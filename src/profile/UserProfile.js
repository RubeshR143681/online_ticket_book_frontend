import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import "../profile/user.css";

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
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import profileImg from "../images/pro3.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  const [userproLoad, setUserProLoad] = useState(true);
  const [bookingProLoad, setBookingProLoad] = useState(true);

  const navigate = useNavigate();

  console.log("this is booking==>", bookings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await getUserBooking();
        setBookings(bookingResponse.bookings);
        setBookingProLoad(false);
        const userDetailsResponse = await getUserDetails();
        setUser(userDetailsResponse.user);
        setUserProLoad(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: `Are you sure to Cancel this movie?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBooking(id);
          await Swal.fire(
            "Caneled!",
            `Your movie   has been Caneled.`,
            "success"
          );
          window.location.reload();
        }
      });
    } catch (err) {
      console.log("Booking failed:", err);
    }
  };

  return (
    <Box
      width={"100%"}
      style={{
        background: "linear-gradient(to right, #20A4F3, #182B3A)",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {userproLoad ? (
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "100px",
            }}
          >
            <CircularProgress
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent="center"
                alignItems={"center"}
                width={"30%"}
                padding={3}
              >
                <img
                  src={profileImg}
                  alt="profile"
                  style={{ width: "150px" }}
                />
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
                  <span style={{ fontWeight: "600" }}> Email:</span>{" "}
                  {user.email}
                </Typography>
              </Box>
            )}
          </div>
        )}

        {bookingProLoad ? (
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "300px",
              marginTop: "100px",
            }}
          >
            <CircularProgress
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        ) : (
          <div>
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
                          <span style={{ fontWeight: "600" }}>Price:</span>{" "}
                          {booking.movie.ticket_price *
                            booking.seatNumber.split(",").length}
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
                          {/* className="bg-transparent border border-red-400  text-red-400 h-[30px] w-[70px] hover:text-white hover:bg-red-500 rounded font-semibold" */}
                          <button className="myButton">Cancel</button>
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

export default UserProfile;
