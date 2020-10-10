exports = function(changeEvent) {

    const collection = context.services.get("GlobalCRED").db("CREDEvents").collection("events");
    const docId = changeEvent.documentKey._id;
    const theDate = new Date();

    collection;
    collection.findOne({_id : docId})
        .then(item => {
            const minute = 60*1000;
            const time = new Date(item.date).getTime() + (item.duration * minute);
            const endDate = new Date(time);

            collection;
            collection.updateOne(
                {_id : docId} ,
                {
                    $set :
                        {
                            endDate: endDate
                        }
                }
            );



        });


};
