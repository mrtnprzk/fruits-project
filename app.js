//mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    //                                            .../connect or create this DB
    await mongoose.connect('mongodb://localhost:27017/fruitsDB');

    //FRUITS-----------------------------------------------------------
    //Schema
    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "No name specified!"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });

    //Model                     ->must be singular
    const Fruit = mongoose.model('Fruit', fruitSchema);

    //new fruit
    const fruit = new Fruit ({
        name: "Peach",
        rating: 5,
        review: "Not great, Not terrible."
    });
    // fruit.save(); //insert

    //PEOPLE-----------------------------------------------------------
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema //relationshop with fruit
    });

    const Person = mongoose.model('Person', personSchema);

    const person = new Person ({
        name: "Amy",
        age: 17,
        favouriteFruit: fruit
    });
    // person.save(); //insert

    //Another Fruits with insertMany------------------------------------
    const kiwi = new Fruit({
        name: "Kiwi",
        rating: 10,
        review: "The best fruit!"
    });

    const orange = new Fruit({
        name: "Orange",
        rating: 4,
        review: "Too sour."
    });

    const banana = new Fruit({
        name: "Banana",
        rating: 4,
        review: "Weird texture..."
    });

    // Fruit.insertMany([kiwi, orange, banana], function(err){ //insert
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully saved all the fruits.");
    //     }
    // });

    //How to FIND something---------------------------------------------
    Fruit.find(function(err, fruits){
        if (err) {
            console.log(err);
        } else {
            // mongoose.connection.close() //it will close connection in terminal
            // console.log(fruits);
            fruits.forEach(element => {
                console.log(element.name);
            });
        }
    });

    //How to UPDATE something--------------------------------------------
    //                  ->update this data  
    // Fruit.updateOne({_id: "62684882e426f40da52db928"}, {review: "Kinda sorta like it."}, function(err){
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully updated.");
    //     }
    // });

    // Person.updateOne({name: "John"}, {favouriteFruit: fruit}, function(err){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully updated.");
    //     }
    // });

    //How to DELETE One--------------------------------------------------
    Person.deleteOne({_id: "62693d8cd07041a2e874ed64"}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Succesfully deleted.");
        }
    });

    //How to DELETE Many-------------------------------------------------
    // Fruit.deleteMany({
    //     _id: {
    //         $in: [
    //         "626934b95199bf5feaa258b3",
    //         "626935e0f3c3c42b4a2101b8",
    //         "62693623c0e1decb19823b01"
    //         ]
    //     }
    // }, function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully deleted.");
    //     }
    // });


};