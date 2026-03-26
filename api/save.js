export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { type, data, password, fileName } = req.body;

  // 1. Password Verification (Removed VITE_ prefix so it isn't bundled into the frontend)
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized - Invalid Password" });
  }

  // 2. Fetch GitHub config from Env
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO || "Mvdodiya001/APAROKSHA2026";
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

  if (!GITHUB_TOKEN) return res.status(500).json({ error: "Missing GitHub Token in Vercel settings" });

  let filePath = "";
  let fileContent = "";
  let commitMessage = "";

  // 3. Format payload
  if (type === "timeline") {
    filePath = "src/data/timeline.ts";
    fileContent = `export interface TimelineEvent {\n  id: string;\n  name: string;\n  time: string;\n  description?: string;\n  link?: string;\n}\n\nexport interface TimelineDay {\n  day: string;\n  events: TimelineEvent[];\n}\n\nexport const timelineData: TimelineDay[] = ${JSON.stringify(data, null, 2)};\n`;
    commitMessage = "Update timeline events via Admin Panel";
  } else if (type === "content") {
    filePath = "src/data/content.ts";
    fileContent = `export interface Coordinator {\n  name: string;\n  phone: string;\n}\n\nexport interface SiteContent {\n  aboutUsText: string;\n  flyerLink: string;\n  eventsBrochureLink: string;\n  contactEmail: string;\n  studentCoordinators: Coordinator[];\n  facultyIncharge: Coordinator[];\n}\n\nexport const contentData: SiteContent = ${JSON.stringify(data, null, 2)};\n`;
    commitMessage = "Update site content via Admin Panel";
  } else if (type === "flyer") {
    // SECURITY PATCH: Sanitize fileName to prevent Path Traversal attacks
    const sanitizedFileName = (fileName || "uploaded-flyer.pdf").replace(/[^a-zA-Z0-9.\-_]/g, "");
    filePath = `public/main/${sanitizedFileName}`;
    fileContent = data;
    commitMessage = `Upload brochure ${sanitizedFileName} to main/ via Admin Panel`;
  } else if (type === "eventsBrochure") {
    const sanitizedFileName = (fileName || "events-brochure.pdf").replace(/[^a-zA-Z0-9.\-_]/g, "");
    filePath = `public/events/${sanitizedFileName}`;
    fileContent = data;
    commitMessage = `Upload events brochure ${sanitizedFileName} to events/ via Admin Panel`;
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }

  try {
    // 4. Get SHA of file (needed if updating an existing file)
    let sha = undefined;
    const fileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "Aparoksha-Admin" }
    });
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      sha = fileData.sha; // Extract SHA if file exists
    }

    // 5. Commit to GitHub
    const contentToEncode = type === "flyer" ? fileContent : Buffer.from(fileContent).toString('base64');

    const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "Aparoksha-Admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: commitMessage,
        content: contentToEncode,
        branch: GITHUB_BRANCH,
        sha
      })
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      throw new Error(errorData.message || "Failed to commit to GitHub");
    }

    res.status(200).json({ success: true, message: "File successfully updated in GitHub" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
