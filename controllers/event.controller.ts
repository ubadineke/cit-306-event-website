import { Request, Response } from 'express';
import sendEmail from '../utils/sendEmail';

export default class Event {
  //Register for event
  public static async register(req: Request, res: Response) {
    try {
      const { firstname, email } = req.body;

      //Save to DB

      //Send Email
      const message = `Congratulations ${firstname} on registering for Botfest`;
      await sendEmail({
        email,
        subject: 'BOTFEST 2024',
        message,
      });

      res.status(200).json('Successfully registered');
    } catch (err) {
      console.log(err);
      res.status(500).json('Error registering. Try again!');
    }
  }

  //Retrieve all registered
  public static async getAllRegistered(req: Request, res: Response) {
    try {
      res.status(200).json();
    } catch (err) {}
    res.status(500).json('Error fetching registered attendees. Try again!');
  }
}
