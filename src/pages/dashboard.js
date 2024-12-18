import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { fetchUsers } from "../slices/userSlice";
import { clearToken } from "../slices/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.totalPages);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      dispatch(fetchUsers(page));
    }
  }, [token, page, dispatch, router]);

  const handleLogout = () => {
    dispatch(clearToken());
    router.push("/login");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  if (!token) {
    return null;
  }
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ padding: "2rem" }}
    >
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
}
