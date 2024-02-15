import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
const AddMovie = () => {
  const navigate = useNavigate();

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

  const labelProps = {
    mt: 1,
    mb: 1,
  };

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    ticket_price: "",
    available_time: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(inputs, actors);
  //   addMovie({ ...inputs, actors })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  console.log("this is co", inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addMovie({ ...inputs, actors });
      console.log("Booking successful:", res);

      await Toast.fire({
        icon: "success",
        text: "Your movie has been Added successfully",
        background: "green",
        color: "white",
      });
      navigate("/movies");
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

  return (
    <div
      style={{
        background: "linear-gradient(to right, #7b4397, #dc2430)",
        padding: "60px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          bgcolor={"white"}
          borderRadius={"20px"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Ticket Price (INR)</FormLabel>
          <TextField
            value={inputs.ticket_price}
            onChange={handleChange}
            name="ticket_price"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Show available Time </FormLabel>
          <TextField
            value={inputs.available_time}
            onChange={handleChange}
            name="available_time"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
