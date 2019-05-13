
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ticket_schema = new Schema({
    title:String,
    description:String
});

var Ticket = mongoose.model("Ticket",ticket_schema);

module.exports.Ticket = Ticket;