import { storage } from '@lib/config/firebase';
// const ffmpeg = require('fluent-ffmpeg');
import { Readable, PassThrough } from 'stream';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

interface UploadImageResponse {
  message: string;
  status: number;
  url?: string;
}

class ImageService {
  async uploadImage(
    file: File,
    /**
     * Path from images/<your path>
     * @example `recipes/`
     */
    path: string,
    fileName: string
  ): Promise<UploadImageResponse> {
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Check if file is an image
    // const isImageFile = await this.isImage(fileBuffer);
    // if (!isImageFile) {
    //   throw new Error('File is not an image');
    // }

    // Convert to .webp
    // const webpBuffer = await this.convertToWebp(fileBuffer);

    // Upload to Firebase Storage
    const fileRef = ref(storage, `images/${path}${fileName}.webp`);
    await uploadBytes(fileRef, fileBuffer);

    return {
      message: 'Uploaded successfully',
      status: 200,
      url: fileRef.fullPath,
    };
  }

  // isImage = async (file: Buffer): Promise<boolean> => {
  //   const fileType = await FileType.fileTypeFromBuffer(file);
  //   if (!fileType) return false;
  //   return fileType.mime.startsWith('image/');
  // };

  // convertToWebp = async (file: Buffer): Promise<Buffer> => {
  //   return new Promise((resolve, reject) => {
  //     const stream = new PassThrough();
  //     stream.end(file);
  //     ffmpeg(stream)
  //       .format('webp')
  //       .on('error', reject)
  //       .on('end', (output: any) => {
  //         resolve(output);
  //       })
  //       .pipe();
  //   });
  // };

  //   // Get the image's hash
  //   static async getImageHash(file: File) {
  //     const buffer = await file.arrayBuffer();
  //     const hash = await crypto.createHash('sha256').update(buffer).digest();
  //     return hash;
  //   }

  //   // Check if the image's hash is known to be malicious
  //   static isKnownMaliciousHash(hash: string) {
  //     // TODO: Implement this function
  //     return false;
  //   }
}

export default new ImageService();
