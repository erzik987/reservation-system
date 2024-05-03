import { NextFunction, Request, Response } from 'express';

const login = (req: Request, res: Response, next: NextFunction) => {
  const loginReq = req.body;

  if (loginReq.token === process.env.LOGIN_TOKEN || '') {
    return res.status(200).json({ authenticated: true, message: 'Login successfull' });
  } else {
    return res.status(401).json({ authenticated: false, message: 'Login failed' });
  }
};

export default { login };
