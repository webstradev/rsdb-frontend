import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useApi } from "util/useApi";
import { useAuthentication } from "util/useAuthentication";
import { AxiosResponse } from "axios";

export const Login: React.FC = () => {
  const [error, setError] = useState("");
  const loginResp = useApi("post", "/v1/login");
  const { login } = useAuthentication();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (loginResp.loading) return;

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await loginResp.sendToAPI(
      {
        email: data.get("email"),
        password: data.get("password"),
      },
      (res: AxiosResponse) => {
        if (res.status === 200) {
          const { user, token } = res.data;
          // Set authentication data in context
          login({
            id: user.id,
            email: user.email,
            role: user.role,
            token,
          });
        } else if (loginResp.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("Unable to authenticate due to server error");
        }
      }
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to continue
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
