const { Checkbox } = require("@material-ui/core")
const { bookings } = require("./models")

module.exports = (app, models) => {

  // Get all users/houses/rentals
  app.get('/rest/:model', async (req, res) => {
    let model = models[req.params.model]
    let docs = await model.find()
    res.json(docs)
  })



  app.get('/rest/houses/ccity/:city', async (req, res) => {
    let city = req.params.city
    let model = models['houses']
    let docs = await model.find({ city: { $regex: '^' + city, $options: 'i' } }).populate('featureIds')
    res.json(docs)
  })


  // Get houses by city (searching for one letter at a time or all citys distinct)
  app.get('/rest/houses/city/:city', async (req, res) => {
    let city = req.params.city
    let model = models['houses']
    if (!city) {
      let docs = await model.find({ city: { $regex: '^' + city, $options: 'i' } })
      res.json(docs)
      return;
    }
    let docs = await model.aggregate([{
      $group: {
        _id: "$city",
        country: {
          $first: "$country",
        }
      }
    },
    {
      $sort: { _id: 1 }
    }])
    res.json(docs)
  })

  // Get houses by filters 
  app.get('/rest/houses/filters/:filters', async (req, res) => {
    let b = JSON.parse(req.params.filters)
    //console.log(b)

    // Feature filters
    let featureIds = []
    !b.wifi ? null : featureIds.push({ featureIds: "6046bf371807457c80418887" })
    !b.tv ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1a" })
    !b.breakfast ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1b" })
    !b.gym ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1c" })
    !b.kitchen ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1d" })
    !b.smoking ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1e" })
    !b.animalFriendly ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f1f" })
    !b.pool ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f20" })
    !b.parking ? null : featureIds.push({ featureIds: "604773bf04ac3c37f09f7f21" })
    // console.log("so what is feaurures here?:", featureIds)
    let model = models['houses']

    let unixTimestamp = Math.floor(new Date().getTime())

    let doIt = false

    let checkBookingCollection = await bookings.find({
      $or: [
        { $and: [{ endDate: { $gt: b.availableStart } }, { endDate: { $lt: b.availableEnd } }] }, // overlapping a booking
        { $and: [{ startDate: { $gt: b.availableStart } }, { startDate: { $lt: b.availableEnd } }] }, // overlappign a booking
        { $and: [{ startDate: { $lt: b.availableStart } }, { endDate: { $gt: b.availableEnd } }] }, //inside a booking range
        { $and: [{ startDate: { $gt: b.availableStart } }, { endDate: { $gt: b.availableEnd } }] },// booking range inside chosen dates
      ]
    })
    console.log("this is the stuff", checkBookingCollection)
    if (checkBookingCollection.length !== 0) {
      console.log("can u see me??")
      doIt = true

    }

    if (!featureIds.length) {
      console.log("do it is :", doIt)
      // Without any checkbox filters
      let docs = await model.find({
        $and: [
          { $and: [{ bedrooms: { $lte: b.bedroomsMax } }, { bedrooms: { $gte: b.bedroomsMin } }] },
          { $and: [{ price: { $lte: b.priceMax } }, { price: { $gte: b.priceMin } }] },
          { $and: [{ availableEnd: { $gt: unixTimestamp } }, { availableEnd: { $gt: b.availableEnd } }] },
          { $and: [{ availableStart: { $lt: b.availableStart } }] },
          { city: b.city }
        ]
      }).populate(['userId', 'featureIds']).exec()

      if (doIt) {
        //let c = await docs.filter(x => !checkBookingCollection.filter(y => y.houseId === x._id).length);
        let c = docs.filter(function (objFromH) {
          let result= !checkBookingCollection.find(function (objFromB) {
            console.log("check the ids B and H", objFromB.houseId, objFromH._id)
            return objFromH._id === objFromB.houseId
          });
          console.log("line 103",result)
          return result
        })
       
        res.json(c)
      }
      else {
        res.json(docs)
      }
      return;
    } else {
      // With checkbox filters
      let docs = await model.find({
        $and: [
          { $and: [{ bedrooms: { $lte: b.bedroomsMax } }, { bedrooms: { $gte: b.bedroomsMin } }] },
          { $and: [{ price: { $lte: b.priceMax } }, { price: { $gte: b.priceMin } }] },
          { $and: [{ availableEnd: { $gt: unixTimestamp } }, { availableEnd: { $gt: b.availableEnd } }] },
          { $and: [{ availableStart: { $lt: unixTimestamp } }, { availableStart: { $lt: b.availableStart } }] },
          { city: b.city },
          { $and: featureIds }
        ]
      }).populate(['userId', 'featureIds']).exec()
      //console.log("populated?:", docs)
      res.json(docs)
      return;
    }
  })

  // Get users houses by userId
  app.get('/rest/houses/user/:id', async (req, res) => {
    let model = models['houses']
    let docs = await model.find({ userId: req.params.id }).populate(['userId', 'featureIds']).exec()
    res.json(docs)
  })

  // Get users bookings by userId
  app.get('/rest/bookings/user/:id', async (req, res) => {
    let model = models['bookings']
    let docs = await model.find({ userId: req.params.id }).populate(['userId', 'houseId']).exec()
    res.json(docs)
  })

  // Add a new house
  app.post('/rest/houses', async (req, res) => {
    let model = models['houses']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  // Add a new booking
  app.post('/rest/bookings', async (req, res) => {
    let model = models['bookings']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  // Delete house 
  app.delete('/rest/houses/:id', async (req, res) => {
    let houseId = req.params.id
    let house = await models['houses'].remove({ _id: houseId })
    res.json(house)
  })

  // Delete booking
  app.delete('/rest/bookings/:id', async (req, res) => {
    let bookingId = req.params.id
    let booking = await models['bookings'].remove({ _id: bookingId })
    res.json(booking)
  })

}


