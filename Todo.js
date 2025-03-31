const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: String,
    done:{
        type:Boolean,
        default:false
    }
});

const TodoModel = mongoose.model('Todo', TodoSchema);

// ✅ Correct module export
module.exports = TodoModel;
