import Jimp from 'jimp';

export default async function handler(req, res) {
  const { url, width, height } = req.query;

  if (!url || !width || !height) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const image = await Jimp.read(url);
    image.resize(parseInt(width), parseInt(height));
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    res.setHeader('Content-Type', Jimp.MIME_JPEG);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process image' });
  }
}