import { NextFunction, Request, Response } from 'express';

const login = (req: Request, res: Response, next: NextFunction) => {
  const loginReq = req.body;

  // console.log(req);

  // return loginReq === 'heslo';authenticated: boolean;
  // message: string;
  // }

  if (loginReq.token === 'heslo') {
    return res.status(200).json({ authenticated: true, message: 'Login successfull' });
  } else {
    return res.status(401).json({ authenticated: false, message: 'Login failed' });
  }
};

export default { login };
