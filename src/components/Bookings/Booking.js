import {
  Button,
  FormLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  iconColor: "white",
  background: "green",
  color: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

const Booking = () => {
  const [movie, setMovie] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState(); // New state for total ticket price

  console.log("this is move==>", movie);

  const [loadingMovie, setLoadingMovie] = useState(true);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    seatNumber: selectedSeats,
    date: "",
  });

  const rows = 5; // Number of rows
  const seatsPerRow = 6; // Number of seats per row

  const generateSeatLabel = (row, seat) => {
    return String.fromCharCode(65 + row) + (seat + 1);
  };

  const handleSeatClick = (row, seat) => {
    const seatLabel = generateSeatLabel(row, seat);

    if (selectedSeats.includes(seatLabel)) {
      // If seat is already selected, unselect it
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
    } else {
      // If seat is not selected, add it to the selected seats
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(id);

        setMovie(res.movie);
        setLoadingMovie(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      seatNumber: selectedSeats.join(", "),
    }));
  }, [selectedSeats]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "seatNumber") {
      setInputs((prevState) => ({
        ...prevState,
        seatNumber: value,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newBooking({ ...inputs, movie: movie._id });
      console.log("Booking successful:", res);

      await Toast.fire({
        icon: "success",
        text: "Your movie has been booked successfully",
        background: "green",
        color: "white",
      });
      navigate("/user");
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "User Details are wrong Please Enter correct details",
        background: "red",
        color: "white",
      });
      console.log("Booking failed:", err);
    }
  };

  console.log("this is seleted set", selectedSeats);

  return (
    <div
      style={{
        paddingLeft: "30px",
        background: "linear-gradient(to right, #feada6, #f5efef)",
      }}
    >
      {loadingMovie ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 64px)" // Adjust the height based on your layout
        >
          <CircularProgress style={{ color: "black" }} />
        </Box>
      ) : (
        <div>
          {movie && (
            <Fragment>
              <Typography
                padding={3}
                fontFamily="fantasy"
                variant="h4"
                textAlign={"center"}
              >
                Book TIckets Of Movie: {movie.title}
              </Typography>
              <Box display={"flex"} justifyContent={"center"}>
                <Box
                  display={"flex"}
                  justifyContent={"column"}
                  flexDirection="column"
                  paddingTop={3}
                  width="50%"
                  marginRight={"auto"}
                >
                  <img
                    width="80%"
                    height={"300px"}
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{ borderRadius: "10px" }}
                  />
                  <Box width={"80%"} marginTop={3} padding={2}>
                    <Typography paddingTop={2}>{movie.description}</Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Actors:
                      {movie.actors.map((actor, index) =>
                        index === movie.actors.length - 1
                          ? " " + actor
                          : " " + actor + ","
                      )}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Release Date: {new Date(movie.releaseDate).toDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Box width={"50%"} marginTop={"-15px"}>
                  <form onSubmit={handleSubmit}>
                    <Box
                      padding={5}
                      margin={"auto"}
                      display="flex"
                      flexDirection={"column"}
                    >
                      <div>
                        <p>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "18px",
                              marginRight: "15px",
                            }}
                          >
                            Ticket Price :
                          </span>
                          ₹{movie.ticket_price}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "18px",
                              marginRight: "15px",
                            }}
                          >
                            Show time :
                          </span>
                          {movie.available_time}
                        </p>
                      </div>
                      <div>
                        <h2>Movie Seat Booking</h2>
                        <div>
                          {Array.from({ length: rows }, (_, rowIndex) => (
                            <div key={rowIndex}>
                              {Array.from(
                                { length: seatsPerRow },
                                (_, seatIndex) => (
                                  <Button
                                    key={seatIndex}
                                    variant={
                                      selectedSeats.includes(
                                        generateSeatLabel(rowIndex, seatIndex)
                                      )
                                        ? "contained"
                                        : "outlined"
                                    }
                                    color="primary"
                                    onClick={() =>
                                      handleSeatClick(rowIndex, seatIndex)
                                    }
                                    style={{ margin: "5px" }}
                                  >
                                    {generateSeatLabel(rowIndex, seatIndex)}
                                  </Button>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                        <div>
                          {/* <p>Selected Seats: {selectedSeats.join(", ")}</p> */}
                        </div>
                      </div>
                      <FormLabel style={{ marginTop: "20px" }}>
                        Seat Number
                      </FormLabel>
                      <TextField
                        name="seatNumber"
                        value={selectedSeats.join(", ")}
                        onChange={handleChange}
                        type={"text"}
                        margin="normal"
                        variant="standard"
                      />
                      <FormLabel>Booking Date</FormLabel>
                      <TextField
                        name="date"
                        type={"date"}
                        margin="normal"
                        variant="standard"
                        value={inputs.date}
                        onChange={handleChange}
                      />
                      <div>
                        <p>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "18px",
                              marginRight: "15px",
                            }}
                          >
                            Final Ticket Price :
                          </span>
                          ₹{movie.ticket_price * selectedSeats.length}
                        </p>
                      </div>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          marginTop: "30px",
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          borderRadius: 5,
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
