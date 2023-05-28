// import ImageService from '@lib/service/FileService'; // Update the path accordingly
// import { NextApiResponse, NextApiRequest } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Check if the user is authenticated
//   // Perform your authentication logic here, for example, using session or token validation
//   const isAuthenticated = req.cookies.user; // Replace with your authentication check

//   if (!isAuthenticated) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   if (req.method === 'POST') {
//     try {
//       // Get the file from the request body
//       const file = req.body.file as File;
//       const path = req.body.path as string;
//       const fileName = req.body.fileName as string;
//       console.log('request body: ', req.body);

//       // Call the uploadImage method from ImageService
//       const response = await ImageService.uploadImage(file, path, fileName);
//       console.log('Response form imageService ', response);
//       // Return the response
//       return res.status(response.status).json(response.url);
//     } catch (error: any) {
//       console.error('Image conversion error:', error);
//       return res
//         .status(500)
//         .json({ message: 'Image conversion failed', error: error.message });
//     }
//   }

//   return res.status(400).json({ message: 'Invalid request' });
// }
