import express, { Router, Request, Response } from "express";
import Form, { IForm, IAddress } from "../model/form";

const router: Router = express.Router();

// POST method to create a new form
router.post("/submit", async (req: Request, res: Response) => {
  try {
    const { name, age, addresses } = req.body;

    // Check if there are more than 5 addresses
    if (addresses.length > 5) {
      return res.status(400).json({ error: "Maximum 5 addresses allowed" });
    }

    // Check if there is more than one address marked as default
    const defaultAddresses = addresses.filter((address: IAddress) => address.isDefault);
    if (defaultAddresses.length > 1) {
      return res.status(400).json({ error: "Only one address can be marked as default" });
    }

    // Create new form instance
    const newForm: IForm = new Form({
      name,
      age,
      addresses
    });

    // Save the form to the database
    await newForm.save();

    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET method to retrieve forms
router.get("/forms", async (req: Request, res: Response) => {
  try {
    const forms: IForm[] = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
