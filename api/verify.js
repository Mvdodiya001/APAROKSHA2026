export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const { password } = req.body;
  
  // Verify password exclusively on the backend
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized - Invalid Password" });
  }

  // If password matches, return success
  res.status(200).json({ success: true });
}
