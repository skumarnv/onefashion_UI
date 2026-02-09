import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ...existing code...
export default function TextBox(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const isPasswordType = props.type === "password";
    return (
        <TextField
            {...props}
            type={isPasswordType ? (showPassword ? "text" : "password") : props.type}
            InputProps={{
                ...props.InputProps,
                ...(isPasswordType && {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                disableRipple
                                sx={{ '&:focus': { outline: 'none' } }}
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                })
            }}
        />
    );
}

