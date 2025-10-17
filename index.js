import express from 'express';
import 'dotenv/config';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());



const user = {
    email: 'pemzyj123@gmail.com',
    name: 'Olamide Adeosun',
    stack: 'Node.js/Express, MongoDB, PostgreSQL'
};



async function fetchCatFact () {
    try{
        const res = await fetch(process.env.API_URI, {timeout: 5000});
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`); //throw new Error provides a message
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error.message);  // error.message is dependent on the error type
        // fallback message for API failure
        return { error: 'API is currently unavailable, please try later.' };
    };
}


app.get('/me', async (req, res) => {
    let timestamp = new Date().toISOString();
    const data = await fetchCatFact();
    if (data.error) {
        return res.status(503).json(data);
    }
    res.status(200).json({status: 'success', user:user, timestamp:timestamp, fact:data}); 
});


app.listen(PORT, ()=> {console.log(`server is running on http://localhost:${PORT}/me`)});