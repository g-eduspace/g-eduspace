// Vercel Serverless Function: Proxy gọi Google Gemini API bảo mật
// Giữ kín GEMINI_API_KEY ở môi trường máy chủ Vercel, không làm lộ ra ngoài trình duyệt

export default async function handler(req, res) {
  // Chỉ nhận phương thức POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Chưa cấu hình GEMINI_API_KEY trong Environment Variables của Vercel.' 
    });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Thiếu nội dung prompt.' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi kết nối máy chủ Gemini: ' + err.message });
  }
}
