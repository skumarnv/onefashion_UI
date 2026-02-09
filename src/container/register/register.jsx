import React from "react";
import {
  Box, Button, Checkbox, Container, FormControlLabel,
  Grid, TextField, Typography, Link, IconButton,
  InputAdornment, Paper,
} from "@mui/material";
import TextBox from "../../components/textbox/textbox";
import backgroundImage from "../../assets/jpg/Jewlly.jpg"; // Adjust the path as necessary
import { Visibility, VisibilityOff } from "@mui/icons-material";
import login from "../../assets/png/login.png"; // Adjust the path as necessary
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImage})`, // Use the imported image
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" color="white">
            Capturing Moments, Creating Memories
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8, mx: 4, display: "flex",
            flexDirection: "column", alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Already have an account? <Link href="#">Log in</Link>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sm={4}>
              <TextBox
                label={"First Name"}
              ></TextBox>
            </Grid>
            <Grid item xs={12} md={6} sm={4}>
              <TextBox
                label={"Last Name"}
              ></TextBox>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid container>
              <TextBox
                label={"Email"}
              ></TextBox>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid container>
              <TextBox
                style={{ width: "100%" }}
                type={"password"}
                label={"Password"}
              ></TextBox>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <FormControlLabel
              control={<Checkbox value="agree" color="primary" defaultChecked />}
              label={
                <Typography variant="body2">
                  I agree to the <Link href="#">Terms & Conditions</Link>
                </Typography>
              }
            />
          </Grid>
          <Grid container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#7e57c2" }}
            >
              Create account
            </Button>
          </Grid>
          <Grid container spacing={2} alignItems="center" sx={{ my: 2 }}>
            <Grid item xs>
              <Box sx={{ height: 1, bgcolor: "grey.300" }}></Box>
            </Grid>
            <Grid item>
              <Typography variant="body2">Or register with</Typography>
            </Grid>
            <Grid item xs>
              <Box sx={{ height: 1, bgcolor: "grey.300" }}></Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ textTransform: "none" }}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{ textTransform: "none" }}
              >
                Apple
              </Button>
            </Grid>
          </Grid>
          {/* <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextBox name="firstName" fullWidth label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextBox name="lastName" fullWidth label="Last Name" />
              </Grid>
              <Grid item xs={12}>
                <TextBox type={"password"} variant={"standard"} name="email" fullWidth label="Email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agree" color="primary" defaultChecked />}
                  label={
                    <Typography variant="body2">
                      I agree to the <Link href="#">Terms & Conditions</Link>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#7e57c2" }}
            >
              Create account
            </Button>
            <Grid container spacing={2} alignItems="center" sx={{ my: 2 }}>
              <Grid item xs>
                <Box sx={{ height: 1, bgcolor: "grey.300" }}></Box>
              </Grid>
              <Grid item>
                <Typography variant="body2">Or register with</Typography>
              </Grid>
              <Grid item xs>
                <Box sx={{ height: 1, bgcolor: "grey.300" }}></Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AppleIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Apple
                </Button>
              </Grid>
            </Grid>
          </Box> */}
        </Box>
      </Grid>
    </Grid>
  );
}
