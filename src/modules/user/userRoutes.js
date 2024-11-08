const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./userController");
const multer = require("multer");
const path = require("path");
const User = require("./userSchema");
const { fileArrayTransform } = require("./utils/utils");
const router = express.Router();
const upload = multer({ dest: "documents/" });

const fs = require('fs');



// API to handle form submission and file uploads
router.post("/", upload.array("document"), async (req, res) => {
  try {
    // Destructure form data from req.body
    const {
      firstName,
      lastName,
      email,
      birthDate,
      residentialAddressStreet1,
      residentialAddressStreet2,
      permanentAddressStreet1,
      permanentAddressStreet2,
      addressSame,
      typeOfFile,
      fileName,
      files,
    } = req.body;

    // Create an array to store file paths
    const filePaths = [];
    let newfilePaths = [];

    // Check if files are uploaded and store their paths
    
    if (req.files) {
    
        req.files.forEach((file) => {
            // Construct the new path with the original name and extension
            const newFilePath = path.join(file.destination, file.originalname);
            const fileUrl = `http://localhost:8000/${newFilePath.replace(/\\/g, '/')}`;
            filePaths.push(fileUrl)
    
            // Rename the file to its original name with the extension
            fs.rename(file.path, newFilePath, (err) => {
                if (err) {
                    console.error("Error renaming file:", err);
                } else {
                    console.log("File saved as:", newFilePath);

                    filePaths.push(newFilePath); // Add the updated path to filePaths

                }
            });
        });
    }
    console.log("lion",newfilePaths)
    
    // Prepare the user data to be saved
    const userData = {
      firstName,
      lastName,
      email,
      birthDate,
      residentialAddressStreet1,
      residentialAddressStreet2,
      permanentAddressStreet1,
      permanentAddressStreet2,
      addressSame,
      files: fileArrayTransform(typeOfFile,fileName,filePaths), // Store file paths (not the actual file objects)
    };
    // Save the user data to the database
    const user = new User(userData);
    await user.save();

    // Respond with success message and created user data
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});
router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
