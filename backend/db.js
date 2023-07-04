const mongoose = require('mongoose');
const mongoURI = 'mongodb://gofood:Tanmahii2002%40@ac-k63pewz-shard-00-00.di3va5r.mongodb.net:27017,ac-k63pewz-shard-00-01.di3va5r.mongodb.net:27017,ac-k63pewz-shard-00-02.di3va5r.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-icu79j-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongodb = async () => {
    await mongoose.connect(mongoURI, (err, result) => {
        if (err) console.log("___", err);
        else {
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("foodData2");
            fetched_data.find({}).toArray(function (err, data) {
                const foodCategory = mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.foodData2 = data;
                        global.foodCategory = catData;
                        console.log(global.foodData2);
                    }

                })

                // if(err) console.log(err);
                // else{ 
                //     global.sample = data;
                //     console.log(global.sample);
                // }
            })
        }
    });

}

module.exports = mongodb;

