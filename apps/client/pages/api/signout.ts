import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      deleteCookie('corb_token', { req, res });
      return res.status(200).json(true);
    } catch (e: unknown) {
      return res.status(500).json(e);
    }
  }
}
