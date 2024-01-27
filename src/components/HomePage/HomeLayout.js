import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../../api-helpers/api-helpers";
import CradLayout from "./CradLayout";
import Slider from "react-slick";
import { Paper } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ayalanImg from "../../images/ayalan.jpg";
import animalImg from "../../images/animal.jpg";
import annaporni from "../../images/anna.jpg";
import fn from "../../images/fn.jpg";
import pstwo from "../../images/pstwo.jpg";

const HomeLayout = () => {
  const [loadingHMovie, setLoadingHMovie] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getAllMovies();
        setMovies(res.movies);
        setLoadingHMovie(false); // Set loading to false after fetching movie details
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, []);

  console.log("this is movie===>", movies);
  return (
    <>
      <Box
        width="100%"
        height="full"
        marginTop={2}
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{
          background: "linear-gradient(to right, #7b4397, #dc2430)",
        }}
      >
        <Box style={{ width: "1000px", margin: "30px 30px" }}>
          <Slider {...settings}>
            <Paper>
              <img
                src={ayalanImg}
                style={{ width: "1000px", height: "350px" }}
              />
            </Paper>
            <Paper>
              <img src={pstwo} style={{ width: "1000px", height: "350px" }} />
            </Paper>
            <Paper>
              <img
                src={animalImg}
                style={{ width: "1000px", height: "350px" }}
              />
            </Paper>
            <Paper>
              <img
                src={annaporni}
                style={{ width: "1000px", height: "350px" }}
              />
            </Paper>
          </Slider>
        </Box>
        <Box padding={5}>
          <Typography variant="h4" textAlign={"center"} color={"white"}>
            Latest Releases
          </Typography>
        </Box>
        {loadingHMovie ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            height="calc(100vh - 64px)" // Adjust the height based on your layout
          >
            <CircularProgress style={{ color: "white" }} />
          </Box>
        ) : (
          <Box
            gap={4}
            margin="auto"
            width="90%"
            flexWrap={"wrap"}
            display="flex"
            justifyContent={"center"}
          >
            {movies &&
              movies
                .slice(0, 4)
                .map((movie, index) => (
                  <CradLayout
                    id={movie._id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    posterUrl={movie.posterUrl}
                    description={movie.description}
                    key={index}
                  />
                ))}
          </Box>
        )}

        <Box display={"flex"} padding={5} margin="auto">
          <Button
            LinkComponent={Link}
            to="/movies"
            style={{
              color: "white",
              border: "solid 1px white",
              width: "200px",
            }}
          >
            View All Movies
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeLayout;
