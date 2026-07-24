const whitelist = [
    "http://localhost:5173",
    "https://cstj8wfr-5173.asse.devtunnels.ms",
    "http://localhost:3500",
];

const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};

module.exports = corsConfig;   