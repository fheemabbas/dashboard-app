import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/api";
import { setToken } from "../slices/authSlice";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Enable live validation
  });
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      dispatch(setToken(result.token));
      router.push("/dashboard");
    } catch (error) {
      if (error.data && error.data.error) {
        setError("User does not exist or credentials are invalid.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum length is 8",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            Login
          </Button>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Don't have an account? <Link href="/register">Register here</Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}
