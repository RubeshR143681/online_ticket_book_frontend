import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import profileImg from "../images/pro3.png";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      width={"100%"}
      display="flex"
      style={{
        background: "linear-gradient(to right, #20A4F3, #182B3A)",
        height: "full",
      }}
    >
      <Fragment>
        {" "}
        {admin && (
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
              <span style={{ fontWeight: "600" }}>Email:</span> {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              color="white"
            >
              Added Movies
            </Typography>
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              width="100%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
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
                      {movie.title}
                    </ListItemText>
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

export default AdminProfile;
