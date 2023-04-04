import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  useAuthLoginMutation,
  useAuthRegisterMutation,
} from "../../app/features/apiSlice/apiSlice";
import { useDispatch } from "react-redux";
import { setLogin } from "../../app/features/data";
import { useNavigate } from "react-router-dom";
const form = () => {
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const [pageType, setPageType] = useState("login");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const palette = theme.palette;
  const [AuthLogin, { error, isSuccess, data }] = useAuthLoginMutation();
  const [AuthRegister] = useAuthRegisterMutation();

  //handlers
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  };

  const login = async (values, onSubmitProps) => {
    console.log(onSubmitProps);
    const { email, password } = values;
    const response = await AuthLogin({
      email,
      password,
    });
    if(response.error){
      onSubmitProps.setErrors({apiError:response.error.data.message});
      return response
    }
    const { token, user } = response.data;
    if (token) {
      onSubmitProps.resetForm();
      dispatch(setLogin({ token, user }));
      navigate("/home");
    }
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const {data,error} = await AuthRegister(formData);
    if(error){
      onSubmitProps.setErrors({apiError:error.message});
    }
    if(data){
      onSubmitProps.resetForm();
      setPageType("login");
      navigate("/")
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              
              {errors.apiError&&<Typography sx={{ gridColumn: "span 4", color:"red" }}>{errors.apiError}</Typography>}
              {isLogin && (
                <>
                  <TextField
                    onChange={handleChange}
                    label={"Email"}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}

              {isRegister && (
                <>
                  <TextField
                    onChange={handleChange}
                    label="First Name"
                    onBlur={handleBlur}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    onChange={handleChange}
                    label="Last Name"
                    onBlur={handleBlur}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />

                  {/* drop zone */}
                  <Box
                    sx={{ gridColumn: "span 4" }}
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    padding={"0.5rem"}
                    textAlign="center"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getInputProps, getRootProps }) => {
                        return (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                              <p>Add a picture</p>
                            ) : (
                              <Box
                                alignItems={"center"}
                                display={"flex"}
                                justifyContent={"space-between"}
                              >
                                <Typography>{values.picture.name}</Typography>
                                <EditOutlinedIcon />
                              </Box>
                            )}
                          </Box>
                        );
                      }}
                    </Dropzone>
                  </Box>

                  <TextField
                    onChange={handleChange}
                    label={"Email"}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    // color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default form;
