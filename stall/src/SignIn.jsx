import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Typography
        sx={{ textAlign: "center", marginTop: "80px", marginBottom: "20px" }}
        variant="h4"
      >
        Sign In
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            height: "300px",
            width: "300px",
            padding: "20px",
          }}
        >
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <br></br>
          <br></br>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="password"
            variant="outlined"
          />
          <br></br>
          <br></br>
          <Button
            onClick={() => {
              axios
                .post("https://ruchulu.live/api/login", {
                  username: username,
                  password: password,
                })
                .then((res) => {
                  if (res.data.message === "Login successful") {
                    window.location.href = "/dashboard";
                  }
                });
            }}
            variant="contained"
          >
            Sign in
          </Button>
        </Card>
      </Box>
    </div>
  );
}
