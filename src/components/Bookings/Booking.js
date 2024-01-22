import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);

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
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
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

  console.log("this is inputs", inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newBooking({ ...inputs, movie: movie._id });
      console.log("Booking successful:", res);
      toast.success("Booking successful");
      navigate("/movies");
    } catch (err) {
      console.log("Booking failed:", err);
      toast.error("Booking failed");
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
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
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
  );
};

export default Booking;
