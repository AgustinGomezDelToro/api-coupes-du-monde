import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <html>
      <head>
        <title>Data Redirect</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px;">
        <h1>Welcome!</h1>
        <p>Click the button below to view the data.</p>
        <a href="/api/data">
          <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Go to Data</button>
        </a>
      </body>
    </html>
  `);
} 