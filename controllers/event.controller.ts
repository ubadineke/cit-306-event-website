import { Request, Response } from 'express';
import sendEmail from '../utils/sendEmail';
// import db from '../prisma';
import db from '../prisma';

export default class Event {
  //Register for event
  public static async register(req: Request, res: Response) {
    const { firstName, lastName, email, phoneNumber, gender } = req.body;

    try {
      const transaction = await db.$transaction(async (tx) => {
        // Save to DB within the transaction
        const attendee = await tx.attendee.create({
          data: { firstName, lastName, email, phoneNumber, gender },
        });

        // Send Email
        const message = `Congratulations ${firstName} on registering for Botfest`;
        await sendEmail({
          email: email,
          subject: 'BOTFEST 2024',
          message,
        });

        return { attendee };
      });

      const { attendee } = transaction;

      res.status(200).json({ message: 'Successfully registered', attendee });
    } catch (err) {
      console.log('Error showing:', err);
      res.status(500).json('Error registering. Try again!');
    }
  }

  //Retrieve all registered
  public static async getAllRegistered(req: Request, res: Response) {
    try {
      const attendees = await db.attendee.findMany({
        orderBy: {
          firstName: 'asc',
        },
      });
      res.status(200).json(attendees);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error fetching registered attendees. Try again!');
    }
  }
}
