import mongoose from 'mongoose'

const urlSchema = mongoose.Schema({
    originalURL: {type: String, required: true},
    shortId: {type: String, required: true},
    clicks: {type: Number, default: 0}
}, { 
    timestamps: true 
});

const Url = mongoose.models.urls || mongoose.model('Url', urlSchema);

export default Url;