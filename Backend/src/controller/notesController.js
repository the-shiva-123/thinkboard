import mongoose from "mongoose";
import Note from "../model/Note.js"

export async function getAllNotes (req,res) {
    try {
        const notes=await Note.find().sort({createdAt:-1}); 
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNodes Controller",error);
        res.status(500).json({message:"intenal server error"});
    }
}

export async function getNoteById(req,res) {
    try {
        const note =await Note.findById(req.params.id)
        if(!note ) return res.status(404).json({message:"Note not found"});
        res.json(note);
    } catch (error) {
         console.error("Error in getAllNodes Controller",error);
        res.status(500).json({message:"intenal server error"});
    }
}

export async function createNote (req,res) {
   try {
    const {title,content}=req.body
    const note=new Note({title,content})

    const savedNote =await note.save()
    res.status(201).json(savedNote)

   } catch (error) {
       console.error("Error in createNote Controller",error); 
        res.status(500).json({message:"intenal server error"});
   }
}

export async function updateNote (req,res) {
    try {

          const { id } = req.params;
    const { title, content } = req.body;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" }); 
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } //  return the updated document
    );

    //  If not found, return 404
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // If found and updated, return 200
    res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote Controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


    export async  function deleteNote(req,res) {
       try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    //Check if note existed
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
    }

 