import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { create } from 'domain';

class UserController {
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.payload); // just to see the payload

    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!user)
      return next({ status: StatusCodes.NOT_FOUND, message: 'User not found' });

    res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, passwordConfirm, name, mobileNo } = req.body;
    if (!email || !password || !passwordConfirm! || !name || !mobileNo)
      return next({ status: StatusCodes.NOT_ACCEPTABLE, message: 'Some parameter is missing' })
    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });
    console.log("🚀 ~ file: user.controller.ts:25 ~ UserController ~ register ~ user:", user)

    if (password != passwordConfirm)
      return next({ status: StatusCodes.OK, message: 'Password and Password Confirm not match' })
    if (user)
      return next({ status: StatusCodes.OK, message: 'The Email is aleady in use' })

    const createUser = await prisma.user.create({
      // select:{email:email},
      data: {
        email: String(email),
        password: await bcrypt.hash(password, 8),
        name: String(name),
        mobileNo: String(mobileNo),
        status:'ACTIVE'
      },
    })

    if(createUser)
    res.status(StatusCodes.OK).json({ message:'Register Successfully'});


    // if (!user)
    //   return next({ status: StatusCodes.NOT_FOUND, message: 'User not found' });

    // res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
  }


}

export default new UserController();
