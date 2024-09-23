const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/auth/admin', userRoutes); // Signup, login, and CRUD for both admin and user

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
