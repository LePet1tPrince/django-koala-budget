import { createTheme } from '@mui/material/styles';


export const shades = {
    primary:{
        100: "#d5e6f1",
        200: "#abcde2",
        300: "#82b5d4",
        400: "#589cc5",
        500: "#2e83b7",
        600: "#256992",
        700: "#1c4f6e",
        800: "#123449",
        900: "#091a25"
},

secondary: {
          100: "#d4ebe6",
          200: "#a9d7cd",
          300: "#7ec2b4",
          400: "#53ae9b",
          500: "#289a82",
          600: "#207b68",
          700: "#185c4e",
          800: "#103e34",
          900: "#081f1a"
},
danger: {
    100: "#fae3d7",
    200: "#f5c7af",
    300: "#f1ab88",
    400: "#ec8f60",
    500: "#e77338",
    600: "#b95c2d",
    700: "#8b4522",
    800: "#5c2e16",
    900: "#2e170b"
},

neutral: {
    100: "#eef3f2",
    200: "#dde7e5",
    300: "#ccdad7",
    400: "#bbceca",
    500: "#aac2bd",
    600: "#889b97",
    700: "#667471",
    800: "#444e4c",
    900: "#222726"
},
};



export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]

        },
        danger: {
            main: shades.danger[500]
        },

        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100],

        }

    },
    typography: {
        fontFamily: ["Fauna One", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 20,
        },
        h4: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 14,
        }
    }
})

// api key: 9ae1ebeec445044027bad4c5c00af7446cd964fc92ba59b5bf7cccd166d2907d2538e29dc9d1208848667f77d299bebc0343c29fbc55a6cab08963fe4fe3449b26d739b2c56c7f61d56665f7deeb5a00c77d35989081d1d83a5079c1be2510082f492b55df61cb232271a89921768e1f3f4b4ecf49e59f296c017627097a52d3