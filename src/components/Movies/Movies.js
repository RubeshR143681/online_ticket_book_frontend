import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";
import "./styles.css";

const Movies = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false on error
      });
  }, []);
  return (
    <Box className="hey">
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          height="calc(100vh - 64px)" // Adjust the height based on your layout
          marginTop={"80px"}
        >
          <CircularProgress style={{ color: "white" }} />
        </Box>
      ) : (
        <Box
          width={"100%"}
          margin="auto"
          marginTop={5}
          display={"flex"}
          justifyContent="center"
          flexWrap={"wrap"}
        >
          {movies &&
            movies.map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
