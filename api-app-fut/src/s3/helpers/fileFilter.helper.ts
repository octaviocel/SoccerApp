export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('No existe el archivo'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
