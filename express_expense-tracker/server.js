const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); //to use in app
app.use(express.json());
app.use(express.urlencoded({extended: true})); //true http://localhost:port 

// MongoDB Atlas
// const MONGO_URI = "mongodb+srv://DharshanaRangasamy:dharshana@cluster0.bydapp1.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB Compass
const MONGO_URI = "mongodb://host.docker.internal:27017/expenseDB";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => {
        console.error("MongoDB connection error:",err);
        process.exit(1);
    });

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Expense = mongoose.model('Expense',expenseSchema);

app.post('/expense',async(req,res) => {
    try {
        const { title,amount } = req.body;
        const expense = new Expense({ title,amount });
        await expense.save();
        res.status(201).json({ expense });
    } catch (err) {
        console.error('Error saving expense:',err);
        res.status(500).json({ error:'Failed to save expense'});
    }
});

app.get('/expense',async(req,res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.log('Error fetching expenses:',error);
        res.status(500).json({error:'Failed to fetch expenses'});
    }
});

app.put('/expense/:id',async(req,res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id,req.body,{ new:true });
        if(!updatedExpense) {
            return res.status(404).json({error:'Expense not found'})
        }
        res.json(updatedExpense);
    } catch(err) {
        console.error("error in updating",err);
        res.status(500).json({error:'Failed to update'});
    }
});

app.delete('/expense/:id',async(req,res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if(!deletedExpense) {
            return res.status(404).json({error:'Expense not found'});
        }
        res.json(deletedExpense);
    } catch(err) {
        console.error("error in deleting",err);
        res.status(500).json({error:'Failed to delete'});
    }
});

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});